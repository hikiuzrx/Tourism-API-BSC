import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateAubergeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  adress: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'Limit must be at least 1' })
  limit: number;
}
