import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import {
  LastActivityDto,
  PhoneUpdateDto,
  ProfileUpdateDto,
  UpdatePasswordDto,
} from './dto/create-profile.dto';
import { VerificationService } from '../verification/verification.service';
import { EverificationTypes } from 'src/common/types/verification';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfilesService {
  constructor(
    private prisma: PrismaService,
    private verificationService: VerificationService,
  ) {}

  async myProfile(id: string) {
    console.log('salom');

    let data = await this.prisma.users.findFirst({ where: { id } });

    if (!data) throw new NotFoundException('User not found');
    if (data.role === 'MENTOR') {
      data = await this.prisma.users.findFirst({
        where: { id },
        include: {
          mentorProfile: true,
        },
      });
    }

    return {
      succase: true,
      message: 'Succase my profile',
      data,
    };
  }

  async profileUpdate(id: string, payload: ProfileUpdateDto) {
    let { image, fullName } = payload;

    let data = await this.prisma.users.findFirst({ where: { id } });

    if (!data) throw new NotFoundException('User not found');

    if (image) {
      data = await this.prisma.users.update({ where: { id }, data: { image } });
    }

    if (fullName) {
      data = await this.prisma.users.update({
        where: { id },
        data: { fullName },
      });
    }

    if (data.role === 'MENTOR') {
      data = await this.prisma.users.findFirst({
        where: { id },
        include: { mentorProfile: true },
      });
    } else {
      data = await this.prisma.users.findFirst({ where: { id } });
    }

    return {
      succase: true,
      message: 'Succase my profile',
      data,
    };
  }

  async getLastActivity(userId: string) {
    let data = await this.prisma.lastActivity.findFirst({
      where: { userId },
      include: {
        user: {
          select: {
            fullName: true,
            phone: true,
            role: true,
          },
        },

        course: {
          select: {
            about: true,
          },
        },
        lesson: {
          select: {
            about: true,
          },
        },
      },
    });

    if (!data) {
      return {
        message: 'User Last activity not found',
        lastActivity: null,
      };
    }

    return data;
  }

  async updateLastActivity(userId: string, body: LastActivityDto) {
    let oldUser = await this.prisma.users.findFirst({ where: { id: userId } });
    let data = await this.prisma.lastActivity.upsert({
      where: { userId },
      update: {
        url: body.url,
        courseId: body.courseId,
        lessonId: body.lessonId,
        groupId: body.groupId,
        updatedAt: new Date(),
      },
      create: {
        userId,
        url: body.url,
        courseId: body.courseId,
        lessonId: body.lessonId,
        groupId: body.groupId,
      },
    });

    return data;
  }

  async updatePhone(userId: string, payload: PhoneUpdateDto) {
    await this.verificationService.checkConfirmOtp({
      type: EverificationTypes.EDIT_PHONE,
      phone: payload.phone,
      otp: payload.otp,
    });

    const updated = await this.prisma.users.update({
      where: { id: userId },
      data: { phone: payload.phone },
    });

    return {
      status: true,
      message: 'Telefon raqami yangilandi',
      data: updated,
    };
  }

  async updatePassword(userId: string, payload: UpdatePasswordDto) {
    const { oldPassword, newPassword } = payload;

    const user = await this.prisma.users.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await this.prisma.users.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return {
      message: 'Succase password updated',
      user: updatedUser,
    };
  }
  async updateMentorProfile(userId: string, body: any) {
    const isMentor = await this.prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!isMentor) {
      return this.prisma.mentorProfile.create({
        data: {
          userId,
          ...body,
        },
      });
    }

    return this.prisma.mentorProfile.update({
      where: { userId },
      data: body,
    });
  }
}
