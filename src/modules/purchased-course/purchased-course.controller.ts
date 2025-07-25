import { UserRole } from '@prisma/client';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { PurchasedCourseService } from './purchased-course.service';

import { Roles } from 'src/common/decorators/Roles.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  PurchasedCourseAllDto,
  PurchasedCoursePaymentDto,
  PurchasedOneDto,
} from './dto/create-purchased-course.dto';

@ApiTags('Purchased Courses')
@ApiBearerAuth()
@Controller('api/purchased-courses')
@UseGuards(AuthGuard, RolesGuard)
export class PurchasedCoursesController {
  constructor(
    private readonly purchasedCoursesService: PurchasedCourseService,
  ) {}

  @Post('purchase')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'STUDENT - Purchase a course' })
  @ApiBody({ type: PurchasedCoursePaymentDto })
  @ApiResponse({ status: 201, description: 'Course successfully purchased' })
  async purchase(@Body() body: PurchasedCoursePaymentDto) {
    return this.purchasedCoursesService.PurchasedCoursepayment(body);
  }

  @Get('mine')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'STUDENT - Get my purchased courses' })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'category_id', required: false })
  @ApiQuery({ name: 'level', required: false })
  @ApiResponse({ status: 200, description: 'List of purchased courses' })
  async getMine(@Query() query: PurchasedCourseAllDto) {
    return this.purchasedCoursesService.PurchasedCourseLevel(query);
  }

  @Get('mine/:course_id')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'STUDENT - Get one purchased course by course ID' })
  @ApiParam({ name: 'course_id', required: true })
  @ApiResponse({ status: 200, description: 'Purchased course detail' })
  async getMyCourseById(@Param('course_id') courseId: string, @Req() req) {
    return this.purchasedCoursesService.PurchasedCourseStudent(
      req.user.id,
      courseId,
    );
  }

  @Get('course/:id/students')
  @Roles(UserRole.MENTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'MENTOR/ADMIN - Get students of a course' })
  @ApiParam({ name: 'id', required: true })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, description: 'List of students for the course' })
  async getStudentsByCourse(
    @Param('id') id: string,
    @Query() query: PurchasedOneDto,
  ) {
    return this.purchasedCoursesService.PurchasedCourseMentor(id, query);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'ADMIN - Delete a purchased course by ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Purchased course deleted' })
  async deletePurchasedCourse(@Param('id') id: string) {
    return await this.purchasedCoursesService.deletePurchasedCourse(id);
  }
}
