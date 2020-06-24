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
  IsBoolean,
  IsUUID,
} from 'class-validator';

export class MoveTaskDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  selectedColumnId: string;

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
  @IsDateString()
  dueDate: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(4)
  priority: number;

  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;
}
