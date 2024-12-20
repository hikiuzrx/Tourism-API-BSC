import { IsString, IsNotEmpty, IsEmail, IsInt } from 'class-validator';

export class CreateClubDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  @IsNotEmpty()
  clubId: number;

  @IsString()
  @IsNotEmpty()
  clubName: string;

  @IsString()
  @IsNotEmpty()
  clubAdress: string;
}
