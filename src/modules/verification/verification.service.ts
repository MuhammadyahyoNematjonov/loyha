import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IChekOtp, SendOtpDto, VerifyOtpDto } from './dto/verification.dto';
import { EverificationTypes } from 'src/common/types/verification';
import { SmsService } from 'src/common/services/sms.service';
import { RedisService } from 'src/core/redis/redis.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { SectoMills } from 'src/core/utils/times';
import { getMessages } from 'src/core/utils/functions';
import { generateOtp } from 'src/core/utils/random';

@Injectable()
export class VerificationService {
  constructor(
    private prismaService: PrismaService,
    private smsService: SmsService,
    private redis: RedisService,
  ) {}

  public getKey(type: string, phone: string, confirmation?: boolean) {
    const storesKeys: Record<EverificationTypes, string> = {
      [EverificationTypes.REGISTER]: 'reg_',
      [EverificationTypes.RESET_PASSWORD]: 'respass_',
      [EverificationTypes.EDIT_PHONE]: 'edph_',
    };
    let key = storesKeys[type];
    if (confirmation) {
      key += 'cfm_';
    }
    key += phone;
    return key;
  }

  private async throwIFUserExist(phone: string) {
    const user = await this.prismaService.users.findUnique({
      where: { phone },
    });

    if (user) {
      throw new HttpException('Phone already used', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  private async throwIFUserNotExist(phone: string) {
    const user = await this.prismaService.users.findUnique({
      where: { phone },
    });

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async sendOtp(payload: SendOtpDto) {
    const { type, phone } = payload;
    const key = this.getKey(type, phone);
    const session = await this.redis.get(key);

    if (session) {
      throw new HttpException(
        'Code already sent to user',
        HttpStatus.BAD_REQUEST,
      );
    }

    switch (type) {
      case EverificationTypes.REGISTER:
        await this.throwIFUserExist(phone);
        break;

      case EverificationTypes.EDIT_PHONE:
        await this.throwIFUserNotExist(phone);
        break;

      case EverificationTypes.RESET_PASSWORD:
        await this.throwIFUserNotExist(phone);
        break;
    }

    const otp = generateOtp();
    await this.redis.set(key, JSON.stringify(otp), SectoMills(100));
    await this.smsService.sendSms(getMessages(type, otp), phone);
    return { message: 'Confirmation code Sent' };
  }

  async verifyOtp(payload: VerifyOtpDto) {
    const { type, phone, otp } = payload;

    const session = await this.redis.get(this.getKey(type, phone));

    if (!session) {
      throw new HttpException('OTP expired!', HttpStatus.BAD_REQUEST);
    }

    if (otp !== JSON.parse(session)) {
      throw new HttpException('invalid OTP!', HttpStatus.BAD_REQUEST);
    }

    await this.redis.del(this.getKey(type, phone));
    await this.redis.set(
      this.getKey(type, phone, true),
      JSON.stringify(otp),
      SectoMills(4000),
    );

    return {
      status: true,
      message: 'Verified',
    };
  }

  public async checkConfirmOtp(payload: IChekOtp) {
    const { type, phone, otp } = payload;

    const session = await this.redis.get(this.getKey(type, phone));

    if (!session) {
      throw new HttpException('OTP expired!', HttpStatus.BAD_REQUEST);
    }

    if (otp !== JSON.parse(session)) {
      throw new HttpException('invalid OTP!', HttpStatus.BAD_REQUEST);
    }

    await this.redis.del(this.getKey(type, phone, true));

    return true;
  }
}
