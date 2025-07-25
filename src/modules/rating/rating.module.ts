import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/config/jwt';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

@Module({
  imports: [JwtModule.register(JwtAccesToken)],
  controllers: [RatingController],
  providers: [RatingService, AuthGuard],
})
export class RatingModule {}
