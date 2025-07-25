import {
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Reset_Password {
  @ApiProperty({
    example: '+998883730331',
    description: "Parolni tiklash kerak bo'lgan telefon raqam",
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({
    example: 123456,
    description: 'Telefon raqamga yuborilgan 6 xonali OTP raqam',
  })
  @IsNotEmpty()
  @IsNumber()
  otp: string;

  @ApiProperty({
    example: 'newSecurePass123',
    description: "Yangi parol, 8-16 belgidan iborat bo'lishi kerak",
    minLength: 8,
    maxLength: 16,
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  password: string;
}
