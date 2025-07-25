import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import {
  CourseCategoryAllDto,
  CourseCategoryCreateDto,
} from './dto/create-course-category.dto';

@Injectable()
export class CourseCategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll(payload: CourseCategoryAllDto) {
    let page = Number(payload.page) || 1;
    let limit = Number(payload.limit) || 10;
    let name = payload.name;

    let filter: any = [];

    if (name) {
      filter.push({
        name: {
          contains: name,
          mode: 'insensitive',
        },
      });
    }

    let whereFilter: any = {};
    if (filter.length) {
      whereFilter.OR = filter;
    }

    let result = await this.prisma.courseCategory.findMany({
      where: whereFilter,
      include: {
        courses: true,
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: 'asc',
      },
    });

    return result;
  }

  async create(payload: CourseCategoryCreateDto) {
    let { name } = payload;

    let result = await this.prisma.courseCategory.create({
      data: { name },
      include: {
        courses: true,
      },
    });

    return {
      success: true,
      message: 'Category created successfully',
      result,
    };
  }

  async getOne(id: string) {
    let result = await this.prisma.courseCategory.findFirst({
      where: { id },
      include: {
        courses: true,
      },
    });
    if (!result) throw new NotFoundException('Course category not found');

    return { status: true, message: 'Course category', result };
  }

  async update(id: string, payload: CourseCategoryCreateDto) {
    let oldCategory = await this.prisma.courseCategory.findFirst({
      where: { id },
    });

    if (!oldCategory) throw new NotFoundException('Course category not found');

    let result = await this.prisma.courseCategory.update({
      where: { id },
      data: { name: payload.name },
      include: { courses: true },
    });

    return {
      status: true,
      message: 'Course category updated',
      result,
    };
  }

  async delete(id: string) {
    let result = await this.prisma.courseCategory.findFirst({
      where: { id },
      include: {
        courses: true,
      },
    });
    if (!result) throw new NotFoundException('Course category not found');

    await this.prisma.courseCategory.delete({
      where: { id },
    });

    return {
      status: true,
      message: 'Course category deleted',
    };
  }
}
