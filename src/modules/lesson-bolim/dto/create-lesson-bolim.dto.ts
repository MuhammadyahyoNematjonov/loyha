import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsSemVer,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LessonBolimAllDto {
  @ApiPropertyOptional({
    example: 0,
    description: 'Qaysi offsetdan boshlab olish (sahifalash uchun)',
  })
  @IsNumber()
  @Type(() => Number)
  offset: number;

  @ApiPropertyOptional({
    example: 10,
    description: "Qancha ma'lumot olish kerakligi (limit)",
  })
  @IsNumber()
  @Type(() => Number)
  limit: number;

  @ApiPropertyOptional({
    example: true,
    description: "Bog'langan lessonlarni ham olish kerakmi?",
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  include_lesson: boolean;

  @ApiProperty({
    example: '0f6d30d1-38e2-43e9-97dd-746327ea9e7d',
    description: 'Course ID (UUID formatda)',
  })
  @IsUUID()
  course_id: string;
}

export class LessonBolimUpdate {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Foundation', description: 'nomi' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'course id', description: 'course id' })
  course_id: string;
}

export class CreateLessonBolimDto {
  @ApiProperty({ example: 'Nom', description: "nom qo'ying" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'course_id', description: 'course_id qoying' })
  @IsUUID()
  @IsNotEmpty()
  courseId: string;
}
