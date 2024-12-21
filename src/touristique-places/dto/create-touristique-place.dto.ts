import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateTouristiquePlaceDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  adress: string;

  @IsString()
  type: string;

  @IsNumber()
  id: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()  // optional because the update might not include this field
  planIds: number[];
}
