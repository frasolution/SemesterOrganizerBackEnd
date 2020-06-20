import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class EditCourseDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  courseName: string;
}
