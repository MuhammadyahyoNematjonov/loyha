import { Injectable, NotFoundException } from '@nestjs/common';
import { MentorsAllDto, UsersAllDto } from './dto/create-user.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { contains } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async mentorsAll(payload: MentorsAllDto) {
    let { fullName, offset = 1, limit = 10, search, phone } = payload;

    let filter: any = [];

    if (fullName) {
      filter.push({
        fullName: {
          contains: fullName,
          mode: 'insensitive',
        },
      });
    }

    if (phone) {
      filter.push({
        phone: {
          contains: phone,
          mode: 'insensitive',
        },
      });
    }

    let whereFilter: any = {
      role: 'MENTOR',
    };
    if (filter.length) {
      whereFilter.OR = filter;
    }

    let data = await this.prisma.users.findMany({
      where: whereFilter,

      include: {
        mentorProfile: true,
        mentorCourses: true,
        lessonViews: true,
        purchasedCourses: true,
        ratings: true,
        questionAnswers: true,
        questions: true,
        examResults: true,
        assignedCourses: true,
        lastActivity: true,
        homeworkSubs: true,
      },
      skip: (offset - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'asc',
      },
    });

    return data;
  }

  async mentorOne(id: string) {
    let oldUser = await this.prisma.mentorProfile.findFirst({
      where: {
        id,
        user: {
          role: 'MENTOR',
        },
      },
      include: {
        user: {
          include: {
            mentorCourses: true,
            purchasedCourses: true,
            ratings: true,
            questionAnswers: true,
            questions: true,
            examResults: true,
            assignedCourses: true,
            lastActivity: true,
            homeworkSubs: true,
          },
        },
      },
    });

    if (!oldUser) throw new NotFoundException('Mentor not found');

    return oldUser;
  }

  async UsersAll(payload: UsersAllDto) {
    let { fullName, offset = 1, limit = 10, search, phone } = payload;

    let filter: any = [];

    if (fullName) {
      filter.push({
        fullName: {
          contains: fullName,
          mode: 'insensitive',
        },
      });
    }
    if (phone) {
      filter.push({
        phone: {
          contains: phone,
          mode: 'insensitive',
        },
      });
    }

    let whereFilter: any = {
      role: 'STUDENT',
    };
    if (filter.length) {
      whereFilter.OR = filter;
    }

    let data = await this.prisma.users.findMany({
      where: whereFilter,

      include: {
        mentorProfile: true,
        mentorCourses: true,
        lessonViews: true,
        purchasedCourses: true,
        ratings: true,
        questionAnswers: true,
        questions: true,
        examResults: true,
        assignedCourses: true,
        lastActivity: true,
        homeworkSubs: true,
      },
      skip: (offset - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'asc',
      },
    });

    return data;
  }

  async UserOne(id: string) {
    let oldUser = await this.prisma.users.findFirst({
      where: { id, role: 'STUDENT' },

      include: {
        mentorCourses: true,
        purchasedCourses: true,
        ratings: true,
        questionAnswers: true,
        questions: true,
        examResults: true,
        assignedCourses: true,
        lastActivity: true,
        homeworkSubs: true,
      },
    });

    if (!oldUser) throw new NotFoundException('User not found');

    return oldUser;
  }

  async UserPhone(phone: string) {
    console.log(phone);

    let oldUser = await this.prisma.users.findFirst({
      where: { phone, role: 'STUDENT' },

      include: {
        mentorCourses: true,
        purchasedCourses: true,
        ratings: true,
        questionAnswers: true,
        questions: true,
        examResults: true,
        assignedCourses: true,
        lastActivity: true,
        homeworkSubs: true,
      },
    });

    if (!oldUser) throw new NotFoundException('User not found');

    return oldUser;
  }

  async UserDelete(id: string) {
    let olduser = await this.prisma.users.findFirst({
      where: { id, role: 'STUDENT' },
    });
    if (!olduser) throw new NotFoundException('User not found');

    await this.prisma.users.delete({
      where: { id },
    });

    return {
      succase: true,
      message: 'Succase user delete',
    };
  }
}
