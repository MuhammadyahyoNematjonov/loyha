import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { VerificationService } from '../verification/verification.service';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RedisService } from 'src/core/redis/redis.service';
import { SmsService } from 'src/common/services/sms.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProfilesController],
  providers: [
    ProfilesService,
    VerificationService,
    AuthGuard,
    RedisService,
    SmsService,
    JwtService,
  ],
})
export class ProfilesModule {}
