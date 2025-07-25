import { Module } from '@nestjs/common';
import { LessonViewService } from './lesson-view.service';
import { LessonViewController } from './lesson-view.controller';

@Module({
  controllers: [LessonViewController],
  providers: [LessonViewService],
})
export class LessonViewModule {}
