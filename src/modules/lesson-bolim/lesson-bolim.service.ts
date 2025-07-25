import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import {
  CreateLessonBolimDto,
  LessonBolimAllDto,
  LessonBolimUpdate,
} from './dto/create-lesson-bolim.dto';
import { IChekOtp } from '../verification/dto/verification.dto';
import { assert } from 'console';

@Injectable()
export class LessonBolimService {
  constructor(private prisma: PrismaService) {}

  async lessonbolimAdmin(id: string, payload: LessonBolimAllDto) {
    let { offset = 1, limit = 10, include_lesson, course_id } = payload;

    let oldCourse = await this.prisma.course.findFirst({
      where: { id: course_id },
    });
    if (!oldCourse) throw new NotFoundException('Course not found');

    let olduser = await this.prisma.lessonBolim.findMany({
      where: { courseId: course_id },
      include: {
        lessons: include_lesson || true,
      },
      skip: (offset - 1) * limit,
      take: limit,
    });

    if (!olduser) throw new NotFoundException('lesson bolim not found');

    return {
      succase: true,
      message: 'Succase all lessonbolim',
      olduser,
    };
  }

  async lessonbolimUser(id: string, payload: LessonBolimAllDto) {
    let { offset = 1, limit = 10, include_lesson, course_id } = payload;

    let oldCourse = await this.prisma.course.findFirst({
      where: { id: course_id },
    });
    if (!oldCourse) throw new NotFoundException('Course not found');

    let oldassigncourse = await this.prisma.assignedCourse.findFirst({
      where: { userId: id, courseId: course_id },
    });

    if (!oldassigncourse) throw new ForbiddenException('user forbidden user');

    let olduser = await this.prisma.lessonBolim.findMany({
      where: { courseId: course_id },
      include: {
        lessons: include_lesson || true,
      },
      skip: (offset - 1) * limit,
      take: limit,
    });

    if (!olduser) throw new NotFoundException('lesson bolim not found');

    return {
      succase: true,
      message: 'Succase all lessonbolim',
      olduser,
    };
  }

  async lessonBolimOneid(id: string) {
    let data = await this.prisma.lessonBolim.findFirst({
      where: {
        id,
      },

      include: {
        lessons: true,
        course: true,
        examResults: true,
        activities: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!data) throw new NotFoundException('Lesson bolim not found');

    return data;
  }

  async lessonBolimUpdate(id: string, payload: LessonBolimUpdate) {
    let data = await this.prisma.lessonBolim.findFirst({
      where: {
        id,
      },

      include: {
        lessons: true,
        course: true,
        examResults: true,
        activities: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!data) throw new NotFoundException('Lesson bolim not found');

    return {
      succase: true,
      message: 'Succase updated Lesson Bolim',
      data,
    };
  }

  async lessonBolimdelete(id: string) {
    let data = await this.prisma.lessonBolim.findFirst({
      where: {
        id,
      },

      include: {
        lessons: true,
        course: true,
        examResults: true,
        activities: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!data) throw new NotFoundException('Lesson bolim not found');

    let deleted = await this.prisma.lessonBolim.delete({
      where: {
        id,
      },
    });

    return {
      status: true,
      message: 'Succase lesson Bolim deleted',
      data,
    };
  }

  async create(dto: CreateLessonBolimDto) {
    let data = this.prisma.lessonBolim.create({
      data: {
        name: dto.name,
        courseId: dto.courseId,
      },
    });

    return data;
  }
}
