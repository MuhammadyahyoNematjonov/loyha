import { ParseEnumPipe } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CourseLevel } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CourseAllDto {
  @IsOptional()
  @ApiPropertyOptional({ example: 1, description: 'page' })
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @ApiPropertyOptional({ example: 10, description: 'miqdori' })
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @ApiPropertyOptional({ example: 'Foundation' })
  @IsString()
  @IsNotEmpty()
  search?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'BEGINNER', description: 'level' })
  @IsString()
  @IsNotEmpty()
  @IsEnum(CourseLevel)
  level?: CourseLevel;

  @IsOptional()
  @ApiPropertyOptional({
    example: 'category_id',
    description: 'category idni kiritasiz',
  })
  @IsString()
  @IsNotEmpty()
  category_id?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'a123' })
  @IsString()
  @IsNotEmpty()
  mentor_id?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 10000 })
  @IsString()
  @IsNotEmpty()
  price_min: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 50000 })
  @IsString()
  @IsNotEmpty()
  price_max?: string;
}

export class CourseMentorAllDto {
  @IsOptional()
  @ApiPropertyOptional({ example: 1, description: 'page' })
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @ApiPropertyOptional({ example: 10, description: 'miqdori' })
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @ApiPropertyOptional({ example: 'Foundation' })
  @IsString()
  @IsNotEmpty()
  search?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'BEGINNER', description: 'level' })
  @IsString()
  @IsNotEmpty()
  @IsEnum(CourseLevel)
  level?: CourseLevel;

  @IsOptional()
  @ApiPropertyOptional({
    example: 'category_id',
    description: 'category idni kiritasiz',
  })
  @IsString()
  @IsNotEmpty()
  category_id?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 10000 })
  @IsString()
  @IsNotEmpty()
  price_min: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 50000 })
  @IsString()
  @IsNotEmpty()
  price_max?: string;
}

export class AssistantAddCourse {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'qaz', description: 'assistant_id' })
  assistant_id: string;

  @IsString()
  @ApiProperty({ example: '123', description: 'course_id' })
  @IsNotEmpty()
  course_id: string;
}

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'NodeJS Darslari', description: 'Kurs nomi' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "NodeJS asoslarini o'rgatadigan kurs",
    description: 'Kurs haqida',
  })
  about: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty({ example: '12000', description: "Narxi (so'mda)" })
  price: number;

  @IsEnum(CourseLevel)
  @IsNotEmpty()
  @ApiProperty({
    example: 'BEGINNER',
    enum: CourseLevel,
    description: 'Kurs darajasi',
  })
  level: CourseLevel;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'clx1cat456xyz', description: 'Category ID' })
  categoryId: string;
}

export class UpdateCourseDto {
  @IsOptional()
  @ApiPropertyOptional({
    example: 'ReactJS Darslari',
    description: 'Kurs nomi',
  })
  name?: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: "Kurs haqida yangi ma'lumot",
    description: 'Kurs haqida',
  })
  about?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 300000, description: "Narxi (so'mda)" })
  price?: number;

  @IsOptional()
  @IsEnum(CourseLevel)
  @ApiPropertyOptional({
    example: 'INTERMEDIATE',
    enum: CourseLevel,
    description: 'Kurs darajasi',
  })
  level?: CourseLevel;

  @IsOptional()
  @ApiPropertyOptional({ example: '123321', description: 'Category ID' })
  cursecategoryId?: string;
}
