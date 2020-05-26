import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CheckListDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  title: string;
}
