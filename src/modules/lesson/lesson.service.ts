import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateLessonDto, UpdateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateLessonDto, video?: Express.Multer.File) {
    let videoUrl = video
      ? `http://localhost:3000/video/url/uploads/${video.filename}`
      : '';

    let data = await this.prisma.lesson.create({
      data: {
        name: dto.name,
        about: dto.about,
        video: videoUrl,
        courseId: dto.courseId,
        bolimId: dto.bolimId,
      },
    });

    return data || 'Malumot yoq';
  }

  async update(id: string, dto: UpdateLessonDto, video?: Express.Multer.File) {
    let lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    let videoUrl = video
      ? `http://localhost:3000/video/url/uploads/${video.filename}`
      : '';

    return this.prisma.lesson.update({
      where: { id },
      data: {
        name: dto.name,
        about: dto.about,
        video: videoUrl,
        courseId: dto.courseId,
        bolimId: dto.bolimId,
      },
    });
  }

  async delete(id: string) {
    let lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    return this.prisma.lesson.delete({ where: { id } });
  }

  async getSingle(id: string, lessonId: string) {
    let lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');

    let data = await this.prisma.lessonBolim.findFirst({
      where: {
        id: lesson.bolimId,
      },
      include: {
        course: true,
      },
    });

    let isPurchased = await this.prisma.purchasedCourse.findFirst({
      where: {
        userId: id,
        courseId: lesson.courseId,
      },
    });
    if (!isPurchased) {
      throw new ConflictException('Payment Cash');
    }

    return lesson;
  }

  async getDetail(userId: string, id: string) {
    let lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        Bolim: {
          include: {
            course: true,
          },
        },
      },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');

    let oldLesson = await this.prisma.lessonBolim.findFirst({
      where: {
        id,
      },
      include: {
        course: true,
      },
    });

    if (!oldLesson) throw new NotFoundException('Lesson not found');

    let isPurchased = await this.prisma.purchasedCourse.findFirst({
      where: {
        userId,
        courseId: oldLesson.courseId,
      },
    });
    if (!isPurchased) {
      throw new ConflictException('Payment Cash');
    }

    return lesson;
  }

  async setView(userId: string, lessonId: string, view: boolean) {
    let existing = await this.prisma.lessonView.findFirst({
      where: { lessonId, userId },
    });

    if (!existing) throw new NotFoundException('Lesson View not found');
    let oldLesson = await this.prisma.lessonBolim.findFirst({
      where: {
        id: lessonId,
      },
      include: {
        course: true,
      },
    });

    if (!oldLesson) throw new ConflictException('Lesson Bolim not found');

    let isPurchased = await this.prisma.purchasedCourse.findFirst({
      where: {
        userId,
        courseId: oldLesson.courseId,
      },
    });
    if (!isPurchased) {
      throw new ConflictException('Payment Cash');
    }

    if (existing) {
      return this.prisma.lessonView.update({
        where: { id: existing.id },
        data: { view },
      });
    }

    return this.prisma.lessonView.create({
      data: { lessonId, userId, view },
    });
  }

  async setLastActivity(userId: string, lessonId: string, url: string) {
    let lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        Bolim: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');

    let oldLesson = await this.prisma.lessonBolim.findFirst({
      where: {
        id: lessonId,
      },
      include: {
        course: true,
      },
    });

    if (!oldLesson) throw new ConflictException('Lesson Bolim not found');

    let isPurchased = await this.prisma.purchasedCourse.findFirst({
      where: {
        userId,
        courseId: oldLesson.courseId,
      },
    });
    if (!isPurchased) {
      throw new ConflictException('Payment Cash');
    }

    return this.prisma.lastActivity.upsert({
      where: { userId },
      update: {
        lessonId,
        url,
        courseId: lesson.courseId,
        groupId: lesson.bolimId,
        updatedAt: new Date(),
      },
      create: {
        userId,
        lessonId,
        url,
        courseId: lesson.courseId,
        groupId: lesson.bolimId,
      },
    });
  }
}
