import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  CreateAdminDto,
  CreateAssistantDto,
  CreateMentorDto,
  UpdateMentorDto,
} from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/Roles.decorator';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/users')
@UseGuards(AuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create/admin')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Yangi admin yaratish (faqat ADMIN)' })
  createAdmin(@Body() payload: CreateAdminDto) {
    return this.adminService.create_admin(payload);
  }

  @Post('create/mentor')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Yangi mentor yaratish (faqat ADMIN)' })
  createMentor(@Body() payload: CreateMentorDto) {
    return this.adminService.create_mentor(payload);
  }

  @Post('create/assistant')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Yangi assistant yaratish (faqat ADMIN)' })
  createAssistant(@Body() payload: CreateAssistantDto) {
    return this.adminService.create_assistant(payload);
  }

  @Patch('update/mentor/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Mentorni yangilash (faqat ADMIN)' })
  @ApiParam({ name: 'id', description: 'Mentorning IDsi' })
  updateMentor(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateMentorDto,
  ) {
    return this.adminService.update_mentor(id, payload);
  }

  @Delete('admin/delete/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Adminni o'chirish (faqat ADMIN)" })
  @ApiParam({ name: 'id', description: 'User ID' })
  AdminDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminService.AdminDelete(id);
  }

  @Delete('mentor/delete/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Mentorni o'chirish (faqat ADMIN)" })
  @ApiParam({ name: 'id', description: 'User ID' })
  MentorDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminService.MentorDelete(id);
  }

  @Delete('assistant/delete/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Assistantni o'chirish (faqat ADMIN)" })
  @ApiParam({ name: 'id', description: 'User ID' })
  AssistantDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminService.AssistantDelete(id);
  }
}
