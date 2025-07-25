import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateAdminDto,
  CreateAssistantDto,
  CreateMentorDto,
  UpdateMentorDto,
} from './dto/update-user.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create_admin(payload: CreateAdminDto) {
    let { phone, fullName, password } = payload;

    let checkphone = await this.prisma.users.findUnique({ where: { phone } });
    if (checkphone) throw new ConflictException('phone already used');

    let hash = await bcrypt.hash(password, 10);
    let data = await this.prisma.users.create({
      data: {
        role: 'ADMIN',
        password: hash,
        fullName,
        phone,
      },
    });

    let oldUser = await this.prisma.users.findFirst({
      where: {
        phone,
      },
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
    });
    return {
      status: true,
      message: 'Created user',
      data: oldUser,
    };
  }

  async create_mentor(payload: CreateMentorDto) {
    let {
      phone,
      fullName,
      password,
      about,
      experience,
      telegram,
      instagram,
      linkedin,
      github,
      facebook,
      job,
      website,
    } = payload;

    let checkphone = await this.prisma.users.findUnique({ where: { phone } });
    if (checkphone) throw new ConflictException('phone already used');

    let hash = await bcrypt.hash(password, 10);
    let oldUser = await this.prisma.users.create({
      data: {
        role: 'MENTOR',
        password: hash,
        fullName,
        phone,
      },
    });

    let oldadmin = await this.prisma.mentorProfile.create({
      data: {
        about,
        job,
        experience,
        telegram,
        instagram,
        linkedin,
        github,
        facebook,
        userId: oldUser.id,
      },
    });

    let data = await this.prisma.users.findFirst({
      where: { id: oldUser.id },
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
    });

    return {
      status: true,
      message: 'Created user',
      data,
    };
  }

  async create_assistant(payload: CreateAssistantDto) {
    let { phone, fullName, password, courseId } = payload;

    let oldcourse = await this.prisma.assignedCourse.findUnique({
      where: { id: courseId },
    });
    if (!oldcourse) throw new NotFoundException('Course not found');

    let checkphone = await this.prisma.users.findUnique({ where: { phone } });
    if (checkphone) throw new ConflictException('phone already used');

    let hash = await bcrypt.hash(password, 10);
    let oldUser = await this.prisma.users.create({
      data: {
        role: 'ASSISTANT',
        password: hash,
        fullName,
        phone,
      },
    });
    console.log(oldUser);

    let oldadmin = await this.prisma.assignedCourse.create({
      data: {
        courseId,
        userId: oldUser.id,
      },
    });
    console.log(oldadmin);

    let data = await this.prisma.users.findFirst({
      where: { id: oldUser.id },
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
    });

    return {
      status: true,
      message: 'Created user',
      data,
    };
  }

  async update_mentor(id: string, payload: UpdateMentorDto) {
    let {
      phone,
      fullName,
      about,
      experience,
      telegram,
      instagram,
      linkedin,
      github,
      facebook,
      job,
      website,
    } = payload;

    let checkPhone = await this.prisma.users.findUnique({ where: { phone } });
    let mentor = await this.prisma.users.findUnique({ where: { id } });
    if (!mentor || mentor.role !== 'MENTOR') {
      throw new NotFoundException('Mentor ');
    }
    if (checkPhone && checkPhone.id !== id) {
      throw new ConflictException('Mentor not found');
    }

    await this.prisma.users.update({
      where: { id },
      data: {
        phone,
        fullName,
      },
    });

    await this.prisma.mentorProfile.update({
      where: { userId: id },
      data: {
        about,
        job,
        experience,
        telegram,
        instagram,
        linkedin,
        github,
        facebook,
        website,
      },
    });

    let updatedMentor = await this.prisma.users.findFirst({
      where: { id },
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
    });

    return {
      status: true,
      message: 'Mentor updated',
      data: updatedMentor,
    };
  }

  async AdminDelete(id: string) {
    let olduser = await this.prisma.users.findFirst({
      where: { id, role: 'ADMIN' },
    });
    if (!olduser) throw new NotFoundException('Admin not found');

    await this.prisma.users.delete({
      where: { id },
    });

    return {
      succase: true,
      message: 'Succase Admin delete',
    };
  }

  async MentorDelete(id: string) {
    let olduser = await this.prisma.users.findFirst({
      where: { id, role: 'MENTOR' },
    });
    if (!olduser) throw new NotFoundException('Mentor not found');

    await this.prisma.users.delete({
      where: { id },
    });

    return {
      succase: true,
      message: 'Succase Mentor delete',
    };
  }

  async AssistantDelete(id: string) {
    let olduser = await this.prisma.users.findFirst({
      where: { id, role: 'ASSISTANT' },
    });
    if (!olduser) throw new NotFoundException('Assistant not found');

    await this.prisma.users.delete({
      where: { id },
    });

    return {
      succase: true,
      message: 'Succase Assistant delete',
    };
  }
}
