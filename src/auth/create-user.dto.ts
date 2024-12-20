import { IsString, IsDateString, IsEmail, IsNotEmpty, IsPhoneNumber, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sexe: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsString()
  @IsNotEmpty()
  placeOfBirth: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsPhoneNumber(null) // Validate phone number for any locale
  @IsNotEmpty()
  number: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
