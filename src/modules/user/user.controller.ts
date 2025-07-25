import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Query,
  Delete,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { MentorsAllDto, UsersAllDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/Roles.decorator';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.ADMIN)
  @Get('mentors')
  @ApiOperation({
    summary: 'Barcha mentorlarni filter bilan olish Admin uchun',
  })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'phone', required: false, type: String })
  @ApiQuery({ name: 'fullName', required: false, type: String })
  MentorAll(@Query() payload: MentorsAllDto) {
    return this.userService.mentorsAll(payload);
  }

  @Roles(UserRole.ADMIN)
  @Get('mentors/:id')
  @ApiOperation({ summary: 'Bitta mentorni olish Admin uchun' })
  @ApiParam({ name: 'id', description: 'Mentorning IDsi' })
  MentorOne(@Param('id') id: string) {
    return this.userService.mentorOne(id);
  }

  @Roles(UserRole.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Barcha userlarni filter bilan olish Admin uchun' })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'phone', required: false, type: String })
  @ApiQuery({ name: 'fullName', required: false, type: String })
  UsersAll(@Query() payload: UsersAllDto) {
    return this.userService.UsersAll(payload);
  }

  @Roles(UserRole.ADMIN)
  @Get('single/:id')
  @ApiOperation({ summary: 'Bitta userni olish Admin uchun' })
  @ApiParam({ name: 'id', description: 'User id si' })
  UserOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.UserOne(id);
  }

  @Roles(UserRole.ADMIN)
  @Get('by-phone/:phone')
  @ApiOperation({
    summary: "Userni telefon raqami bo'yicha qidirish Admin uchun",
  })
  @ApiParam({ name: 'phone', description: 'Telefon raqami' })
  PhoneSearch(@Param('phone') phone: string) {
    return this.userService.UserPhone(phone);
  }

  @Roles(UserRole.ADMIN)
  @Delete('delete/:id')
  @ApiOperation({ summary: "Userni id si bo'yicha o'chirish Admin uchun" })
  @ApiParam({ name: 'id', description: 'User id' })
  UserDelete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.UserDelete(id);
  }
}
