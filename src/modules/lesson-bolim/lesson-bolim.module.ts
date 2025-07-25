import { Module } from '@nestjs/common';
import { LessonBolimService } from './lesson-bolim.service';
import { LessonBolimController } from './lesson-bolim.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/config/jwt';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

@Module({
  imports: [JwtModule.register(JwtAccesToken)],
  controllers: [LessonBolimController],
  providers: [LessonBolimService, AuthGuard],
})
export class LessonBolimModule {}
