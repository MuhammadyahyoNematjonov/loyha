import { IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    example: '+998902400025',
    description: 'Foydalanuvchining telefon raqami (xalqaro formatda)',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'Adminov Adminjon',
    description: 'Foydalanuvchining to‘liq ismi',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'string',
    description: 'Foydalanuvchi paroli (kamida 6 ta belgidan iborat bo‘lishi mumkin)',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}



export class CreateMentorDto {
  @ApiProperty({ example: '+998902400025', description: 'Foydalanuvchining telefon raqami' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'Adminov Adminjon', description: 'Foydalanuvchining to‘liq ismi' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'string', description: 'Foydalanuvchining paroli' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 3, description: 'Ish tajribasi (yillarda)' })
  @IsNotEmpty()
  @IsNumber()
  experience: number;

  @ApiProperty({ example: 'Full-stack software engineer', description: 'Kasbi yoki lavozimi' })
  @IsNotEmpty()
  @IsString()
  job: string;

  @ApiProperty({ example: 'string', description: 'Foydalanuvchi haqida qisqacha ma’lumot' })
  @IsNotEmpty()
  @IsString()
  about: string;

  @ApiPropertyOptional({ example: 'https://t.me/raupov_manuchehr', description: 'Telegram havolasi' })
  @IsOptional()
  @IsUrl()
  telegram?: string;

  @ApiPropertyOptional({ example: 'https://facebook.com/username', description: 'Facebook havolasi' })
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiPropertyOptional({ example: 'https://instagram.com/username', description: 'Instagram havolasi' })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiPropertyOptional({ example: 'https://linkedin.com/in/username', description: 'LinkedIn havolasi' })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiPropertyOptional({ example: 'https://github.com/username', description: 'GitHub havolasi' })
  @IsOptional()
  @IsString()
  github?: string;

  @ApiPropertyOptional({ example: 'https://username.com', description: 'Shaxsiy websayti' })
  @IsOptional()
  @IsString()
  website?: string;
}




export class CreateAssistantDto {
  @ApiProperty({ example: "+998902400025" })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: "Adminov Adminjon" })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: "string" })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: "string", description: "Kurs ID" })
  @IsNotEmpty()
  @IsString()
  courseId: string;
}



export class UpdateMentorDto {
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsNumber()
  experience?: number;

  @IsOptional()
  @IsString()
  job?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  telegram?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  github?: string;

  @IsOptional()
  @IsString()
  website?: string;
}
