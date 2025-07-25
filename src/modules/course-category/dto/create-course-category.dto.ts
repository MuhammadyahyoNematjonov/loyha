import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CourseCategoryAllDto {
  @ApiPropertyOptional({
    description:
      "Qaysi elementdan boshlab olish kerakligini ko'rsatadi (pagination)",
    example: 0,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  offset?: number;

  @ApiPropertyOptional({
    description: "Nechta element olish kerakligini ko'rsatadi (pagination)",
    example: 10,
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    description: "Kategoriya nomi bo'yicha qidirish",
    example: 'Frontend',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  page?: number;
}

export class CourseCategoryCreateDto {
  @ApiProperty({
    description: 'Yaratilayotgan kurs kategoriyasi nomi',
    example: 'Backend',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateCourseCategoryDto {}
