import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/config/jwt';

@Module({
  imports:[JwtModule.register(JwtAccesToken)],
  controllers: [LessonController],
  providers: [LessonService,AuthGuard],
})
export class LessonModule {}
