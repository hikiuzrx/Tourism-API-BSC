import { Module } from '@nestjs/common';
import { TouristiquePlaceController } from './touristique-places.controller';
import { TouristiquePlaceService } from './touristique-places.service';

@Module({
  controllers: [ TouristiquePlaceController],
  providers: [TouristiquePlaceService ],
})
export class TouristiquePlacesModule {}
