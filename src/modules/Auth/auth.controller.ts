import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { Reset_Password } from './dto/reset-password';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Foydalanuvchini tizimga kiritish' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Yangi access token olish (refresh token orqali)' })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.RefresholdAcces(dto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Parolni OTP orqali tiklash' })
  resetPassword(@Body() dto: Reset_Password) {
    return this.authService.reset_password(dto);
  }
}
