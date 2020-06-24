import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
export class CreateAndUpdateNoteDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  noteTitle: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(25000)
  noteDescription: string;
}
