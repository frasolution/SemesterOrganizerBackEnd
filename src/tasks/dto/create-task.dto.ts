import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsDateString,
} from 'class-validator';

export class CreateAndUpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(25000)
  description: string;

  @IsOptional()
  @IsDateString()
  dueDate: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(4)
  priority: number;
}
