import { Module } from '@nestjs/common';
import { PurchasedCourseService } from './purchased-course.service';
import { PurchasedCoursesController } from './purchased-course.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/config/jwt';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

@Module({
  imports: [JwtModule.register(JwtAccesToken)],
  controllers: [PurchasedCoursesController],
  providers: [PurchasedCourseService, AuthGuard],
})
export class PurchasedCourseModule {}
