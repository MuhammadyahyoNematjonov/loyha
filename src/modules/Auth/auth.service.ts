import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAccesToken, JwtRefreshToken } from 'src/common/config/jwt';
import { Token_activate } from 'src/common/types/token';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerificationService } from '../verification/verification.service';
import { EverificationTypes } from 'src/common/types/verification';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/common/decorators/Roles.decorator';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { Reset_Password } from './dto/reset-password';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtServise: JwtService,
    private verificationService: VerificationService,
  ) {}

  async generateToken(payload: Token_activate, Token_status = false) {
    let AccessToken = await this.jwtServise.signAsync(payload, JwtAccesToken);
    let RefreshToken = await this.jwtServise.signAsync(
      payload,
      JwtRefreshToken,
    );

    if (Token_status == true) {
      return AccessToken;
    } else {
      return {
        AccessToken,
        RefreshToken,
      };
    }
  }

  async register(payload: Required<RegisterDto>) {
    let { fullName, otp, phone, password } = payload;

    await this.verificationService.checkConfirmOtp({
      phone,
      type: EverificationTypes.REGISTER,
      otp,
    });

    let hashpassword = await bcrypt.hash(password, 10);

    let data = await this.prisma.users.create({
      data: {
        fullName,
        phone,
        password: hashpassword,
      },
    });

    const tokens = await this.generateToken({ id: data.id, role: data.role });

    return {
      status: true,
      message: 'Succase created user',
      data,
      Tokens: tokens,
    };
  }

  async login(payload: LoginDto) {
    let olduser = await this.PhoneAndPasswordCheck(
      payload.password,
      payload.phone,
    );

    return await this.generateToken({ id: olduser.id, role: olduser.role });
  }

  async RefresholdAcces(token: RefreshTokenDto) {
    try {
      let oldId = await this.jwtServise.verifyAsync(
        token.token,
        JwtRefreshToken,
      );
      console.log('token', oldId);

      if (!oldId) throw new UnauthorizedException();

      let checkUser = await this.prisma.users.findFirst({
        where: { id: oldId.id },
      });
      if (!checkUser) throw new UnauthorizedException();

      let AccessToken = await this.generateToken(
        { id: checkUser.id, role: checkUser.role },
        true,
      );

      return { AccessToken };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async reset_password(payload: Required<Reset_Password>) {
    let { otp, phone, password } = payload;

    await this.verificationService.checkConfirmOtp({
      phone,
      type: EverificationTypes.RESET_PASSWORD,
      otp,
    });

    let user = await this.prisma.users.findUnique({ where: { phone } });
    if (!user) throw new NotFoundException('User not found');

    let hashpassword = await bcrypt.hash(password, 10);

    let data = await this.prisma.users.update({
      where: { phone },
      data: {
        password: hashpassword,
      },
    });

    return {
      status: true,
      message: 'Succase updated user',
      data,
    };
  }

  async PhoneAndPasswordCheck(password: string, phone: string) {
    let oldphone = await this.prisma.users.findUnique({ where: { phone } });

    if (!oldphone) throw new NotFoundException('Phone not found');

    let checkpassword: boolean;
    if (oldphone.password.startsWith('$2b$')) {
      checkpassword = await bcrypt.compare(password, oldphone.password);
    } else {
      checkpassword = password === oldphone.password;
    }

    if (!checkpassword) {
      throw new BadRequestException('Password Incorrect');
    }

    return oldphone;
  }
}
