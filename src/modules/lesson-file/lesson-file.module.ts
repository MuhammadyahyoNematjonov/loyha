import { Module } from '@nestjs/common';
import { LessonFileService } from './lesson-file.service';
import { LessonFileController } from './lesson-file.controller';

@Module({
  controllers: [LessonFileController],
  providers: [LessonFileService],
})
export class LessonFileModule {}
