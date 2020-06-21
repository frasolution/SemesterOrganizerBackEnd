import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  columnName: string;
}
