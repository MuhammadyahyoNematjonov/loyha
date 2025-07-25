import { PartialType } from '@nestjs/swagger';
import { CreateLessonFileDto } from './create-lesson-file.dto';

export class UpdateLessonFileDto extends PartialType(CreateLessonFileDto) {}
