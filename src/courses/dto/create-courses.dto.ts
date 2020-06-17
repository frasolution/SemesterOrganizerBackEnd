import {
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateCoursesDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  courseNames: string[];
}
