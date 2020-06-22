import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsDate,
  IsOptional,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

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

  @IsOptional()
  @IsDate()
  dueDate: Date;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(4)
  priority: number;
}
