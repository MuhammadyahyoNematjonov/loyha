import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: '+998883730331',
    description:
      'Foydalanuvchining telefon raqami, +998 bilan boshlanishi kerak',
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({
    example: 'superPassword123',
    minLength: 8,
    maxLength: 16,
    description:
      "Foydalanuvchining paroli, 8-16 ta belgidan iborat bo'lishi kerak",
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  password: string;

  @ApiProperty({
    example: 'Nematjonov Muhammadyahyo',
    minLength: 5,
    maxLength: 50,
    description: "Foydalanuvchining to'liq ismi",
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  fullName: string;

  @ApiProperty({
    example: '123456',
    description: 'Telefon raqamga yuborilgan 6 xonali tasdiqlovchi kod',
  })
  @IsNotEmpty()
  @IsString()
  otp: string;
}
