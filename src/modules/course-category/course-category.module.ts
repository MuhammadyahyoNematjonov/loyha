import { Module } from '@nestjs/common';
import { CourseCategoryService } from './course-category.service';
import { CourseCategoryController } from './course-category.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/config/jwt';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

@Module({
  imports:[JwtModule.register(JwtAccesToken)],
  controllers: [CourseCategoryController],
  providers: [CourseCategoryService,AuthGuard],
})
export class CourseCategoryModule {}
