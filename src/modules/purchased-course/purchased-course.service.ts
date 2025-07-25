import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import {
  PurchasedCourseAllDto,
  PurchasedCoursePaymentDto,
  PurchasedOneDto,
} from './dto/create-purchased-course.dto';
import { PaidVia } from '@prisma/client';

@Injectable()
export class PurchasedCourseService {
  constructor(private prisma: PrismaService) {}

  async PurchasedCourseLevel(payload: PurchasedCourseAllDto) {
    let { offset = 1, limit = 10, search, category_id, level } = payload;

    let filter: any = [];

    let oldcategory = await this.prisma.courseCategory.findFirst({
      where: { id: category_id },
    });

    if (!oldcategory) throw new NotFoundException('Category not found');
    if (search) {
      filter.push({
        course: {
          is: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      });
    }
    if (level) {
      filter.push({
        level: level,
      });
    }

    if (category_id) {
      filter.push({
        category_id: category_id,
      });
    }

    let wherefilter: any = {};
    if (filter.length) {
      wherefilter.OR = filter;
    }

    let data = await this.prisma.purchasedCourse.findMany({
      where: wherefilter,
      include: {
        course: true,
      },

      take: limit,
      skip: (offset - 1) * limit,
    });

    return { succase: true, message: 'Succase  course all', data };
  }

  async PurchasedCourseStudent(id: string, course_id: string) {
    let isPurchased = await this.prisma.purchasedCourse.findFirst({
      where: { courseId: course_id, userId: id },
    });

    if (!isPurchased) throw new ConflictException('Payment Cash');

    let oldcourse = await this.prisma.course.findFirst({
      where: {
        id: course_id,
      },
    });

    if (!oldcourse) throw new NotFoundException('Course not found');

    let data = await this.prisma.purchasedCourse.findFirst({
      where: {
        courseId: course_id,
        userId: id,
      },
      include: {
        course: {
          select: {
            lessonBolimlar: {
              select: {
                lessons: true,
              },
            },
          },
        },
      },
    });

    return { status: true, message: 'succase', data };
  }

  async PurchasedCourseMentor(id: string, payload: PurchasedOneDto) {
    let oldcourse = await this.prisma.course.findFirst({
      where: {
        id,
      },
    });

    if (!oldcourse) throw new NotFoundException('Course not found');

    let { offset = 1, limit = 10, search } = payload;

    let filter: any = [];

    if (search) {
      filter.push({
        course: {
          is: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      });
    }

    let wherefilter: any = { courseId: id };
    if (filter.length) {
      wherefilter.OR = filter;
    }
    let data = await this.prisma.purchasedCourse.findFirst({
      where: wherefilter,
      include: {
        course: true,
        user: true,
      },
      skip: (offset - 1) * limit,
      take: limit,
    });

    if (!data) throw new NotFoundException('Course Not found');

    return { status: true, message: 'succase', data };
  }

  async PurchasedCoursepayment(payload: PurchasedCoursePaymentDto) {
    let { course_id, phone } = payload;

    let oldcourse = await this.prisma.course.findFirst({
      where: {
        id: course_id,
      },
    });
    if (!oldcourse) throw new NotFoundException('Course not found');

    let olduser = await this.prisma.users.findFirst({
      where: {
        phone,
      },
    });

    if (!olduser) throw new NotFoundException('Phone not found');

    let data = await this.prisma.purchasedCourse.create({
      data: {
        userId: olduser.id,
        courseId: oldcourse.id,
        amount: oldcourse.price,
        paidVia: PaidVia.CASH,
      },
      include: {
        user: true,
        course: true,
      },
    });

    return { status: true, message: 'Succase', data };
  }

  async deletePurchasedCourse(id: string) {
    let oldPurchaseCourse = await this.prisma.purchasedCourse.findFirst({
      where: {
        id,
      },
    });

    if (!oldPurchaseCourse)
      throw new NotFoundException('Purchased course not found');

    let data = await this.prisma.purchasedCourse.delete({
      where: {
        id,
      },
    });

    return { data: oldPurchaseCourse };
  }
}
