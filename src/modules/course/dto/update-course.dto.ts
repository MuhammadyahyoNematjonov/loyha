import { ApiPropertyOptional } from '@nestjs/swagger';
import { CourseLevel } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({
    example: 'ReactJS Darslari',
    description: 'Kurs nomi',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({
    example: "Kurs haqida yangi ma'lumot",
    description: 'Kurs haqida',
  })
  about?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional({
    example: 300000,
    description: "Narxi (so'mda)",
  })
  price?: number;

  @IsOptional()
  @IsEnum(CourseLevel)
  @ApiPropertyOptional({
    example: 'INTERMEDIATE',
    enum: CourseLevel,
    description: 'Kurs darajasi (BEGINNER, INTERMEDIATE, ADVANCED)',
  })
  level?: CourseLevel;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({
    example: 'clx1cat456xyz',
    description: 'Category ID',
  })
  categoryId?: string;
}
