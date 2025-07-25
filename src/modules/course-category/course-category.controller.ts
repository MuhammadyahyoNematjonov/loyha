import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { CourseCategoryService } from './course-category.service';
import {
  CourseCategoryAllDto,
  CourseCategoryCreateDto,
} from './dto/create-course-category.dto';

import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/Roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Course Categories')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('course-category')
export class CourseCategoryController {
  constructor(private readonly courseCategoryService: CourseCategoryService) {}

  @Get('all')
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT, UserRole.STUDENT)
  @ApiOperation({ summary: 'CourseCategory royxatini olish (filter bilan)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiUnauthorizedResponse({ description: "Token yo'q yoki yaroqsiz" })
  @ApiForbiddenResponse({ description: "Sizda bu amalga ruxsat yo'q" })
  async getAll(@Query() query: CourseCategoryAllDto) {
    return this.courseCategoryService.getAll(query);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Yangi course category yaratish (faqat admin)' })
  @ApiUnauthorizedResponse({ description: 'Token yoq yoki yaroqsiz' })
  @ApiForbiddenResponse({ description: 'Faqat admin ruxsat etilgan' })
  create(@Body() payload: CourseCategoryCreateDto) {
    return this.courseCategoryService.create(payload);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT, UserRole.STUDENT)
  @ApiOperation({
    summary: 'Bitta course category ni olish (hamma foydalanuvchilar uchun)',
  })
  getOne(@Param('id') id: string) {
    return this.courseCategoryService.getOne(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Course category ni tahrirlash (faqat admin)' })
  update(@Param('id') id: string, @Body() payload: CourseCategoryCreateDto) {
    return this.courseCategoryService.update(id, payload);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Course category ni ochirish (faqat admin)' })
  delete(@Param('id') id: string) {
    return this.courseCategoryService.delete(id);
  }
}
