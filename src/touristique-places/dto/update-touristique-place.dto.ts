import { PartialType } from '@nestjs/swagger';
import { CreateTouristiquePlaceDto } from './create-touristique-place.dto';

export class UpdateTouristiquePlaceDto extends PartialType(CreateTouristiquePlaceDto) {}
