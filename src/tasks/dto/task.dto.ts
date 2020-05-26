import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(25000)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  priority: number;

  @IsNotEmpty()
  @IsBoolean()
  isFinished: boolean;

  //VALIDATOR MISSINF
  @IsNotEmpty()
  dueDate: Date;
}
