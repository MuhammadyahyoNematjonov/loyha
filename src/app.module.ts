import { Module } from '@nestjs/common';
import { PrismaModule } from './core/prisma/prisma.module';
import { AuthModule } from './modules/Auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CourseCategoryModule } from './modules/course-category/course-category.module';
import { CourseModule } from './modules/course/course.module';
import { PurchasedCourseModule } from './modules/purchased-course/purchased-course.module';
import { RatingModule } from './modules/rating/rating.module';
import { LessonBolimModule } from './modules/lesson-bolim/lesson-bolim.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { LessonViewModule } from './modules/lesson-view/lesson-view.module';
import { LessonFileModule } from './modules/lesson-file/lesson-file.module';
import { HomeworkModule } from './modules/homework/homework.module';
import { ExamModule } from './modules/exam/exam.module';
import { QuestionAnswerModule } from './modules/question-answer/question-answer.module';
import { SeaderModule } from './core/seader/seader.module';
import { RedisModule } from './core/redis/redis.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { VerificationModule } from './modules/verification/verification.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [

    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads/lesson'), 
      serveRoot: '/video/url', 
    },
    {
      rootPath: join(process.cwd(), 'uploads/banner'), 
      serveRoot: '/banner/url', 
    },
    {
      rootPath: join(process.cwd(), 'uploads/Introvideo'), 
      serveRoot: '/introvideo/url', 
    }
  ), 


    PrismaModule ,AuthModule,VerificationModule,UserModule,
    ProfilesModule,CourseModule,CourseCategoryModule,PurchasedCourseModule,LessonModule, 
    LessonBolimModule,LessonViewModule, LessonFileModule,
    RatingModule,  HomeworkModule,
     ExamModule,
    QuestionAnswerModule, SeaderModule,RedisModule, 

    
  ],
})
export class AppModule { }
