import { isEmail, IsNotEmpty, IsString,IsEmail } from 'class-validator';

export class CreateAgenceDto {
  @IsNotEmpty()
  @IsString()
  agenceName: string;

  @IsNotEmpty()
  @IsString()
  agenceAdress: string;

  @IsNotEmpty()
  @IsString()
  password:string

  @IsNotEmpty()
  @IsEmail()
  email:string
}
