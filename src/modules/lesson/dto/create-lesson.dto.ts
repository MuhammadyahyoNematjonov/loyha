import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ example: 'Dars', description: 'Dars nomi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Html css ', description: "Dars haqida ma'lumot" })
  @IsString()

  @IsNotEmpty()
  about: string;

  @ApiProperty({ example: 'BolimId', description: "Qaysi bo'limga tegishli" })
  @IsString()

  @IsNotEmpty()
  bolimId: string;

  @ApiProperty({ example: 'CourseId', description: 'Qaysi coursega tegishli' })
  @IsString()
  @IsNotEmpty()
  courseId: string;
}

export class UpdateLessonDto extends PartialType(CreateLessonDto) {}
