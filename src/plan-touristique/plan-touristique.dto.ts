import { IsBoolean, IsNumber, IsString, Min, Max, Length } from 'class-validator';

export class CreateTourismPlanDto {
  @IsNumber()
  @Min(1)
  limit: number;

  @IsString()
  @Length(1, 100)
  duration: string;

  @IsString()
  @Length(1, 255)
  title: string;

  @IsNumber()
  @Min(1)
  toursimId: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsBoolean()
  transporatation: boolean;
}
