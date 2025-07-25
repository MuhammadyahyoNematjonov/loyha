import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionAnswerService } from './question-answer.service';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';
import { UpdateQuestionAnswerDto } from './dto/update-question-answer.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('question-answer')
@ApiTags("Questions & Answers")
export class QuestionAnswerController {
  constructor(private readonly questionAnswerService: QuestionAnswerService) {}

  @Post()
  create(@Body() createQuestionAnswerDto: CreateQuestionAnswerDto) {
    return this.questionAnswerService.create(createQuestionAnswerDto);
  }

  @Get()
  findAll() {
    return this.questionAnswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionAnswerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionAnswerDto: UpdateQuestionAnswerDto) {
    return this.questionAnswerService.update(+id, updateQuestionAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionAnswerService.remove(+id);
  }
}
