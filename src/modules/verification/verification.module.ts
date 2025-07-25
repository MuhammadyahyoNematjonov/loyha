import { Module } from '@nestjs/common';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { SmsService } from 'src/common/services/sms.service';

@Module({
  controllers: [VerificationController],
  providers: [VerificationService, SmsService],
  exports: [VerificationService],
})
export class VerificationModule {}
