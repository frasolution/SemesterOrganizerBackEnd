import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CheckListItemDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  description: string;
}
