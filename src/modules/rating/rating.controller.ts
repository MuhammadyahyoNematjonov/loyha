import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateCourseRatingDto } from './dto/create-rating.dto';
import { Roles } from 'src/common/decorators/Roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Course Rating')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('course-rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @ApiOperation({ summary: "Kursga baho qo'shish" })
  @ApiResponse({ status: 201, description: "Baho muvaffaqiyatli qo'shildi" })
  async create(@Req() req, @Body() dto: CreateCourseRatingDto) {
    const userId = req.user.id;
    return this.ratingService.create(userId, dto);
  }

  @Roles(UserRole.ADMIN)
  @Get('/latest')
  @ApiOperation({ summary: "So'nggi 10ta kurs reytingi" })
  @ApiResponse({ status: 200, description: "So'nggi 10ta kurs reytingi" })
  async findAllLatest() {
    return this.ratingService.findAllLatest();
  }

  @Get('/by-course/:courseId')
  @ApiOperation({ summary: "Kurs bo'yicha reytinglarni olish" })
  @ApiResponse({ status: 200, description: 'Berilgan kurs uchun reytinglar' })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAllBy(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Query('offset', ParseIntPipe) offset = 0,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.ratingService.findAllBy(courseId, offset, limit);
  }

  @Get('/analytics/:courseId')
  @ApiOperation({ summary: 'Kurs reyting analitikasi' })
  @ApiResponse({
    status: 200,
    description: "O'rtacha baho, umumiy reytinglar va taqsimot",
  })
  async getAnalytics(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.ratingService.getAnalytics(courseId);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Reytingni tahrirlash' })
  @ApiResponse({ status: 200, description: 'Reyting yangilandi' })
  async update(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body('rate', ParseIntPipe) rate: number,
    @Body('comment') comment?: string,
  ) {
    return this.ratingService.update(req.user.id, id, rate, comment);
  }

  @Delete('/:id')
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: "Reytingni o'chirish" })
  @ApiResponse({ status: 200, description: "Reyting o'chirildi" })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ratingService.remove(id);
  }
}
