import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LessonViewService } from './lesson-view.service';
import { CreateLessonViewDto } from './dto/create-lesson-view.dto';
import { UpdateLessonViewDto } from './dto/update-lesson-view.dto';

@Controller('lesson-view')
export class LessonViewController {
  constructor(private readonly lessonViewService: LessonViewService) {}

  @Post()
  create(@Body() createLessonViewDto: CreateLessonViewDto) {
    return this.lessonViewService.create(createLessonViewDto);
  }

  @Get()
  findAll() {
    return this.lessonViewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonViewService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLessonViewDto: UpdateLessonViewDto,
  ) {
    return this.lessonViewService.update(+id, updateLessonViewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonViewService.remove(+id);
  }
}
