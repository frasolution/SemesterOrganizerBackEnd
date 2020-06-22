import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateAndUpdateColumnDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  columnName: string;
}
