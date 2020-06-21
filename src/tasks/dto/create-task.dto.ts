import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

// TODO: add missing fields for creating a task
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(25000)
  description: string;
}
