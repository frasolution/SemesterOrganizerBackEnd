import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class checklistDto {
  //size limit about max of skype msg
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  title: string;
}
