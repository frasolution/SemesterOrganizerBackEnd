import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class checklistItemDto {
  //size limit about max of skype msg
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  description: string;
}
