import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/config/jwt';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

@Module({
  imports:[JwtModule.register(JwtAccesToken)],
  controllers: [CourseController],
  providers: [CourseService,AuthGuard],
})
export class CourseModule {}
