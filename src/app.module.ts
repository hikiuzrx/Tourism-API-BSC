import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClubModule } from './club/club.module';
import { AubergeModule } from './auberge/auberge.module';
import { AgenceModule } from './agence/agence.module';
import { TouristiquePlacesModule } from './touristique-places/touristique-places.module';
import { PlanTouristiqueModule } from './plan-touristique/plan-touristique.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ReservationService } from './reservation/reservation-activity.service';
import { ReservationsAubergeService } from './reservation-auberge/reservation-auberge.service';
import { ReservationsAubergeController } from './reservation-auberge/reservation-auberge.service';

@Module({
  imports: [DbModule, UserModule, AuthModule, ClubModule, AubergeModule, AgenceModule, TouristiquePlacesModule, PlanTouristiqueModule, CloudinaryModule],
  controllers: [AppController, ReservationAubergeController],
  providers: [AppService, CloudinaryService, ReservationService, ReservationsAubergeService,],
})
export class AppModule {}
