import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  courseName: String;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(8)
  semester: string;
}
