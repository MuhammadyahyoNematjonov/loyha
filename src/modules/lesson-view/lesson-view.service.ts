import { Injectable } from '@nestjs/common';
import { CreateLessonViewDto } from './dto/create-lesson-view.dto';
import { UpdateLessonViewDto } from './dto/update-lesson-view.dto';

@Injectable()
export class LessonViewService {
  create(createLessonViewDto: CreateLessonViewDto) {
    return 'This action adds a new lessonView';
  }

  findAll() {
    return `This action returns all lessonView`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonView`;
  }

  update(id: number, updateLessonViewDto: UpdateLessonViewDto) {
    return `This action updates a #${id} lessonView`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonView`;
  }
}
