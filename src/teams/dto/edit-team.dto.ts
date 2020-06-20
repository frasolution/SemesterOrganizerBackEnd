import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class EditTeamDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  teamName: string;
}
