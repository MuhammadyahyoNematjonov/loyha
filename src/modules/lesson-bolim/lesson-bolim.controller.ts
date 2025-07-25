import {Controller,Get,Param,Query,Put,Delete,Body,UseGuards,HttpCode, Post,} from "@nestjs/common";
import { LessonBolimService } from "../lesson-bolim/lesson-bolim.service";
import { CreateLessonBolimDto, LessonBolimAllDto,LessonBolimUpdate } from "../lesson-bolim/dto/create-lesson-bolim.dto"; 
import { AuthGuard } from "src/common/guards/jwt-auth.guard";
import { Roles } from "src/common/decorators/Roles.decorator"; 
import { RolesGuard } from "src/common/guards/roles.guard";
import {ApiTags,ApiBearerAuth,ApiOperation,ApiParam,ApiQuery,ApiResponse, ApiBody,} from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
@ApiTags("Lesson Bolim")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller("lesson-groups")
export class LessonBolimController {
  constructor(private readonly lessonBolimService: LessonBolimService) {}

  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @Get("all/:course_id")
  @ApiOperation({ summary: "Admin va Mentor uchun barcha lesson bolimlar" })
  @ApiParam({ name: "course_id", description: "Kurs IDsi" })
  @ApiQuery({ name: "offset", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
  @ApiQuery({ name: "include_lesson", required: false, type: Boolean, example: true })
  @ApiResponse({ status: 200, description: "Barcha lesson bolimlar ro'yxati" })
  async getAllAdmin(
    @Param("course_id") courseId: string,
    @Query() query: LessonBolimAllDto,
  ) {
    return this.lessonBolimService.lessonbolimAdmin(
      (query as any).user?.id,
      { ...query, course_id: courseId },
    );
  }

@Roles(UserRole.ADMIN, UserRole.MENTOR)
@Post("create")
@ApiOperation({ summary: "Yangi lesson bolim yaratish (Admin va Mentor)" })
@ApiBody({ type: CreateLessonBolimDto })
@ApiResponse({ status: 201, description: "Yaratilgan lesson bo'lim malumotlari" })
async createLessonBolim(
  @Body() dto: CreateLessonBolimDto,
) {
  return this.lessonBolimService.create(dto);
}

  @Roles(UserRole.STUDENT)
  @Get("mine-all/:course_id")
  @ApiOperation({ summary: "Foydalanuvchi uchun tayinlangan kurs bo'limlari" })
  @ApiParam({ name: "course_id", description: "Kurs IDsi" })
  @ApiQuery({ name: "offset", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
  @ApiQuery({ name: "include_lesson", required: false, type: Boolean, example: true })
  @ApiResponse({ status: 200, description: "Foydalanuvchiga tayinlangan lesson bo'limlar" })
  async getAllUser(
    @Param("course_id") courseId: string,
    @Query() query: LessonBolimAllDto,
  ) {
    return this.lessonBolimService.lessonbolimUser(
      (query as any).user?.id,
      { ...query, course_id: courseId },
    );
  }

  @Get("detail/:id")
  @ApiOperation({ summary: "Lesson bolim tafsilotlari" })
  @ApiParam({ name: "id", description: "Lesson bolim ID" })
  @ApiResponse({ status: 200, description: "Lesson bo'lim tafsilotlari qaytariladi" })
  async getOne(@Param("id") id: string) {
    return this.lessonBolimService.lessonBolimOneid(id);
  }

  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @Put(":id")
  @ApiOperation({ summary: "Lesson bolimni yangilash" })
  @ApiParam({ name: "id", description: "Lesson bolim ID" })
  @ApiResponse({ status: 200, description: "Yangilangan lesson bolim qaytariladi" })
  async update(
    @Param("id") id: string,
    @Body() dto: LessonBolimUpdate,
  ) {
    return this.lessonBolimService.lessonBolimUpdate(id, dto);
  }

  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @Delete(":id")
  @ApiOperation({ summary: "Lesson bolimni o'chirish" })
  @ApiParam({ name: "id", description: "Lesson bolim ID" })
  @ApiResponse({ status: 200, description: "O'chirilgan lesson bolim ma’lumotlari qaytariladi" })
  async delete(@Param("id") id: string) {
    return this.lessonBolimService.lessonBolimdelete(id);
  }
}