import {
  Controller,
  Get,
  Body,
  Req,
  UseGuards,
  Put,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import {
  ProfileUpdateDto,
  PhoneUpdateDto,
  LastActivityDto,
  UpdatePasswordDto,
} from './dto/create-profile.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UpdatePhoneInterceptor } from 'src/common/interceptors/last-activity';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/Roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Profiles')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('my')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Foydalanuvchi profilini olish (self)' })
  async getProfile(@Req() req: Request) {
    const user = req['user'];
    return this.profilesService.myProfile(user.id);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Profilni tahrirlash (ism, rasm)' })
  async updateProfile(@Req() req: Request, @Body() body: ProfileUpdateDto) {
    const user = req['user'];
    return this.profilesService.profileUpdate(user.id, body);
  }

  @Get('last-activity')
  @ApiOperation({ summary: 'Oxirgi faoliyatni olish' })
  async getLastActivity(@Req() req: Request) {
    const user = req['user'];
    return this.profilesService.getLastActivity(user.id);
  }

  @Put('last-activity')
  @ApiOperation({ summary: 'Oxirgi faoliyatni yangilash' })
  @ApiBody({ type: LastActivityDto })
  async updateLastActivity(@Req() req: Request, @Body() body: LastActivityDto) {
    const user = req['user'];
    return this.profilesService.updateLastActivity(user.id, body);
  }

  @Post('phone/update')
  @UseInterceptors(UpdatePhoneInterceptor)
  @ApiOperation({ summary: 'Telefon raqamni yangilash (OTP tekshiruv bilan)' })
  async updatePhone(@Req() req: Request, @Body() body: PhoneUpdateDto) {
    const user = req['user'];
    return this.profilesService.updatePhone(user.id, body);
  }

  @Put('password/update')
  @ApiOperation({ summary: 'Parolni yangilash' })
  @ApiBody({ type: UpdatePasswordDto })
  async updatePassword(
    @Req() req: Request,
    @Body() payload: UpdatePasswordDto,
  ) {
    const user = req['user'];
    return this.profilesService.updatePassword(user.id, payload);
  }

  @Roles(UserRole.MENTOR)
  @Put('mentor-profile')
  @ApiOperation({ summary: "Mentor profili ma'lumotlarini yangilash" })
  async updateMentorProfile(@Req() req: Request, @Body() body: any) {
    const user = req['user'];
    return this.profilesService.updateMentorProfile(user.id, body);
  }
}
