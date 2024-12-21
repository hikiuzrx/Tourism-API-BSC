import { Module } from '@nestjs/common';
import { TourismPlanService } from './plan-touristique.service';
import { TourismPlanController } from './plan-touristique.controller';

@Module({
  controllers: [TourismPlanController],
  providers: [TourismPlanService ]
})
export class PlanTouristiqueModule {}
