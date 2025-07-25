import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  Query,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LessonService } from './lesson.service';
import { CreateLessonDto, UpdateLessonDto } from './dto/create-lesson.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Express } from 'express';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/Roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

const videoFileFilter = (req: any, file: Express.Multer.File, cb: Function) => {
  const allowedTypes = ['video/mp4', 'video/mkv', 'video/webm'];
  // @ts-ignore
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new BadRequestException('Faqat video fayllar yuklash mumkin!'),
      false,
    );
  }
  cb(null, true);
};

const storage = diskStorage({
  destination: './uploads/lesson',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    cb(null, `lesson-${uniqueSuffix}${ext}`);
  },
});
@ApiTags('Lessons')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @Post()
  @ApiOperation({ summary: 'Yangi dars yaratish (video fayl bilan)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Dars nomi' },
        about: { type: 'string', example: 'Dars haqida' },
        bolimId: { type: 'string', example: 'bolim-id' },
        courseId: { type: 'string', example: 'course-id' },
        video: { type: 'string', format: 'binary' },
      },
      required: ['name', 'about', 'bolimId', 'courseId'],
    },
  })
  @UseInterceptors(
    FileInterceptor('video', { storage, fileFilter: videoFileFilter }),
  )
  create(
    @Body() dto: CreateLessonDto,
    @UploadedFile() video?: Express.Multer.File,
  ) {
    return this.lessonService.create(dto, video);
  }

  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @Put(':id')
  @ApiOperation({ summary: 'Darsni yangilash (video fayl bilan)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: "Yangilangan dars ma'lumotlari va video fayl",
    type: UpdateLessonDto,
  })
  @UseInterceptors(
    FileInterceptor('video', { storage, fileFilter: videoFileFilter }),
  )
  update(
    @Param('id') id: string,
    @Body() dto: UpdateLessonDto,
    @UploadedFile() video?: Express.Multer.File,
  ) {
    return this.lessonService.update(id, dto, video);
  }

  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @Delete(':id')
  @ApiOperation({ summary: "Darsni o'chirish" })
  delete(@Param('id') id: string) {
    return this.lessonService.delete(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Darsni olish' })
  getSingle(@Param('id') id: string, @Req() req) {
    return this.lessonService.getSingle(req.user.id, id);
  }

  @Get('detail/:id')
  @ApiOperation({ summary: "To'liq dars ma'lumotlarini olish" })
  getDetail(@Param('id') id: string, @Req() req) {
    return this.lessonService.getDetail(req.user.id, id);
  }

  @Roles(UserRole.STUDENT, UserRole.ASSISTANT)
  @Post(':id/view')
  @ApiOperation({ summary: "Dars ko'rildi sifatida belgilash" })
  setView(
    @Param('id') lessonId: string,
    @Query('userId') userId: string,
    @Query('view') view: boolean,
  ) {
    return this.lessonService.setView(userId, lessonId, view);
  }

  @Roles(UserRole.STUDENT, UserRole.ASSISTANT)
  @Post(':id/activity')
  @ApiOperation({
    summary: 'Foydalanuvchining oxirgi dars faoliyatini belgilash',
  })
  setLastActivity(
    @Param('id') lessonId: string,
    @Query('userId') userId: string,
    @Query('url') url: string,
  ) {
    return this.lessonService.setLastActivity(userId, lessonId, url);
  }
}
