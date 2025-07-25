import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/config/jwt';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

@Module({
  imports: [JwtModule.register(JwtAccesToken)],
  controllers: [UserController, AdminController],
  providers: [UserService, AdminService, AuthGuard],
})
export class UserModule {}
