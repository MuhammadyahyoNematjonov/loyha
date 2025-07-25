import { Injectable } from '@nestjs/common';
import { CreateLessonFileDto } from './dto/create-lesson-file.dto';
import { UpdateLessonFileDto } from './dto/update-lesson-file.dto';

@Injectable()
export class LessonFileService {
  create(createLessonFileDto: CreateLessonFileDto) {
    return 'This action adds a new lessonFile';
  }

  findAll() {
    return `This action returns all lessonFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonFile`;
  }

  update(id: number, updateLessonFileDto: UpdateLessonFileDto) {
    return `This action updates a #${id} lessonFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonFile`;
  }
}
