import { IsUUID, IsInt, Min, Max, IsOptional, IsString } from 'class-validator';

export class CreateCourseRatingDto {
  @IsUUID()
  courseId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rate: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
