// src/modules/rating/rating.service.ts
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateCourseRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateCourseRatingDto) {
    let { courseId, rate, comment } = dto;

    let isPurchased = await this.prisma.purchasedCourse.findFirst({
      where: { courseId, userId },
    });

    if (!isPurchased) throw new ConflictException('Payment Cash');

    let olduser = await this.prisma.users.findFirst({
      where: {
        id: userId,
      },
    });
    if (!olduser) throw new NotFoundException('User not found');

    let oldcourse = await this.prisma.rating.findFirst({
      where: { courseId, userId },
    });
    if (oldcourse) {
      throw new ForbiddenException('Course rating already');
    }

    let data = await this.prisma.rating.create({
      data: { courseId, userId, rate, comment: comment || '' },
      include: {
        course: true,
      },
    });

    return data;
  }

  async findAllLatest() {
    let data = await this.prisma.rating.findMany({
      orderBy: { createdAt: 'asc' },
      take: 10,
      include: {
        course: true,
        user: true,
      },
    });

    return data;
  }

  async findAllBy(courseId: string, offset = 0, limit = 10) {
    let oldcourse = await this.prisma.rating.findFirst({
      where: {
        courseId,
      },
    });
    if (!oldcourse) throw new NotFoundException('Course rating not found');

    let data = await this.prisma.rating.findMany({
      where: { courseId },
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'asc' },
      include: {
        user: { select: { fullName: true } },
      },
    });

    return data;
  }

  async getAnalytics(courseId: string) {
    let oldcourse = await this.prisma.rating.findFirst({
      where: {
        courseId,
      },
    });
    if (!oldcourse) throw new NotFoundException('Course rating not found');

    let ratings = await this.prisma.rating.findMany({
      where: { courseId },
    });

    let total = ratings.length;

    let sumOfRates = ratings.reduce((sum, rating) => sum + rating.rate, 0);
    let average = total > 0 ? sumOfRates / total : 0;

    let ratingcount: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    for (let rating of ratings) {
      ratingcount[rating.rate] += 1;
    }

    return {
      averageRate: +average.toFixed(2),
      totalRatings: total,
      rateCount: ratingcount,
    };
  }

  async remove(id: string) {
    let oldcourse = await this.prisma.rating.findFirst({
      where: {
        id,
      },
    });
    if (!oldcourse) throw new NotFoundException('Course rating not found');
    await this.prisma.rating.delete({ where: { id } });
  }

  async update(userId: string, id: string, rate: number, comment?: string) {
    let oldcourse = await this.prisma.rating.findFirst({
      where: {
        id,
      },
    });
    if (!oldcourse) throw new NotFoundException('Course rating not found');

    let isPurchased = await this.prisma.purchasedCourse.findFirst({
      where: { courseId: oldcourse.id, userId },
    });

    if (!isPurchased) throw new ConflictException('Payment Cash');

    let data = await this.prisma.rating.update({
      where: { id },
      data: { rate, comment },
    });

    return data;
  }
}
