import { Body, Controller, Post } from '@nestjs/common';
import {
  SendOtpDto,
  VerificationOtpDto,
  VerifyOtpDto,
} from './dto/verification.dto';
import { ApiOperation } from '@nestjs/swagger';
import { EverificationTypes } from 'src/common/types/verification';
import { VerificationService } from './verification.service';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationservice: VerificationService) {}
  @ApiOperation({
    description: `Valid types:
        ${EverificationTypes.REGISTER},
        ${EverificationTypes.RESET_PASSWORD},
        ${EverificationTypes.EDIT_PHONE},
        `,
  })
  @Post('send')
  sendOtp(@Body() body: SendOtpDto) {
    return this.verificationservice.sendOtp(body);
  }

  @ApiOperation({
    description: `Valid types:
        ${EverificationTypes.REGISTER},
        ${EverificationTypes.RESET_PASSWORD},
        ${EverificationTypes.EDIT_PHONE},
        `,
  })
  @Post('verify')
  verifyOtp(@Body() body: VerifyOtpDto) {
    return this.verificationservice.verifyOtp(body);
  }
}
