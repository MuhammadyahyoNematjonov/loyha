import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: '+998883730331',
    description: 'Foydalanuvchining telefon raqami',
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({
    example: '12345678',
    description: 'Foydalanuvchining paroli',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
