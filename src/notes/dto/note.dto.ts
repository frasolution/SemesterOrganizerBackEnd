import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
export class NoteDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  title: string;

  //size limit about max of skype msg
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(25000)
  description: string;
}
