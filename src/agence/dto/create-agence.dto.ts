import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAgenceDto {
  @IsNotEmpty()
  @IsString()
  agenceName: string;

  @IsNotEmpty()
  @IsString()
  agenceAdress: string;
}
