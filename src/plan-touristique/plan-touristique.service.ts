// tourism-plan.service.ts
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTourismPlanDto, } from './plan-touristique.dto';
import { TourismPlan } from '@prisma/client';

@Injectable()
export class TourismPlanService {
  private tourismPlans: CreateTourismPlanDto[] = [];

  findAll() {
    return this.tourismPlans;
  }

  findOne(id: number) {
    const plan = this.tourismPlans.find((plan) => plan.toursimId === id);
    if (!plan) {
      throw new NotFoundException(`Tourism Plan with ID ${id} not found.`);
    }
    return plan;
  }

  create(createDto: CreateTourismPlanDto) {
    this.tourismPlans.push(createDto);
    return createDto;
  }

  async updateTourismPlan(
     id: number,
     updateData: [string, string],
   ): Promise<TourismPlan> {
     const index = this.tourismPlans.findIndex((plan) => plan.toursimId === id);
     if (index === -1) {
       throw new NotFoundException(`Tourism Plan with ID ${id} not found.`);
     }
   
     const fieldToUpdate = updateData[0];
     const newValue = updateData[1];
   
     // Perform field-specific validation and update logic
     switch (fieldToUpdate) {
       case 'title':
         // Check for title conflicts (if required)
         const existingPlan = this.tourismPlans.find(
           (plan) => plan.title === newValue && plan.toursimId !== id,
         );
         if (existingPlan) {
           throw new ConflictException('Title already in use.');
         }
         this.tourismPlans[index].title = newValue;
         break;
   
       case 'duration':
         // Validate or directly update the duration
         this.tourismPlans[index].duration = newValue;
         break;
   
       case 'price':
         // Ensure price is a valid number
         const priceValue = parseFloat(newValue);
         if (isNaN(priceValue) || priceValue <= 0) {
           throw new BadRequestException('Invalid price value.');
         }
         this.tourismPlans[index].price = priceValue;
         break;
   
       case 'limit':
         // Ensure limit is a valid number
         const limitValue = parseInt(newValue, 10);
         if (isNaN(limitValue) || limitValue <= 0) {
           throw new BadRequestException('Invalid limit value.');
         }
         this.tourismPlans[index].limit = limitValue;
         break;
   
       case 'transporatation':
         // Ensure transporatation is a boolean value
         if (newValue !== 'true' && newValue !== 'false') {
           throw new BadRequestException('Invalid transportation value.');
         }
         this.tourismPlans[index].transporatation = newValue === 'true';
         break;
   
       default:
         throw new BadRequestException(`Field '${fieldToUpdate}' cannot be updated.`);
     }
   
     return this.tourismPlans[index];
   }
   

  remove(id: number) {
    const index = this.tourismPlans.findIndex((plan) => plan.toursimId === id);
    if (index === -1) {
      throw new NotFoundException(`Tourism Plan with ID ${id} not found.`);
    }
    return this.tourismPlans.splice(index, 1);
  }
}