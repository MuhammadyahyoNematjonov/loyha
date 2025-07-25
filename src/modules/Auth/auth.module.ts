import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/config/jwt';
import { VerificationService } from '../verification/verification.service';
import { SmsService } from 'src/common/services/sms.service';

@Global()
@Module({
  imports: [JwtModule.register(JwtAccesToken)],
  controllers: [AuthController],
  providers: [AuthService, VerificationService, SmsService],
})
export class AuthModule {}
