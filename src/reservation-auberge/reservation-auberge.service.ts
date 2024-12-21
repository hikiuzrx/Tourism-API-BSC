import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

import { ReservationState, ReservationNature, ReservationAuberge } from '@prisma/client';

@Injectable()
export class ReservationsAubergeService {
  constructor(private prisma: DbService) {}

  // Create Reservation for Auberge
  async createReservationAuberge(data: {
    reserveTo: number;
    reserveFor: number;
    roomNumber: number;
    cardId: number;
    minor?: boolean;
    DateOfEnter: Date;
    DateOfExist: Date;
    reservationState: ReservationState;
    reservationNature: ReservationNature;
  }) {
    return await this.prisma.reservationAuberge.create({
      data,
    });
  }

  // Get all Reservations for Auberge
  async getAllReservationsAuberge() {
    return await this.prisma.reservationAuberge.findMany();
  }

  // Get Reservation by ID for Auberge
  async getReservationAubergeById(reservationId: number) {
    return await this.prisma.reservationAuberge.findUnique({
      where: { reservationId },
    });
  }

  // Update Reservation for Auberge
  async updateReservationAuberge(reservationId: number, updateData: [string, any]): Promise<ReservationAuberge> {
     let reservation: ReservationAuberge;
   
     switch (updateData[0]) {
       case 'roomNumber':
         reservation = await this.prisma.reservationAuberge.findFirst({
           where: {
             roomNumber: updateData[1],
           },
         });
         if (reservation) {
           throw new ConflictException('This room number is already reserved');
         } else {
           return this.prisma.reservationAuberge.update({
             where: {
               reservationId,
             },
             data: {
               roomNumber: updateData[1],
             },
           });
         }
   
       case 'DateOfEnter':
         return this.prisma.reservationAuberge.update({
           where: {
             reservationId,
           },
           data: {
             DateOfEnter: updateData[1],
           },
         });
   
       case 'DateOfExist':
         return this.prisma.reservationAuberge.update({
           where: {
             reservationId,
           },
           data: {
             DateOfExist: updateData[1],
           },
         });
   
       case 'reservationState':
         return this.prisma.reservationAuberge.update({
           where: {
             reservationId,
           },
           data: {
             reservationState: updateData[1],
           },
         });
   
       case 'reservationNature':
         return this.prisma.reservationAuberge.update({
           where: {
             reservationId,
           },
           data: {
             reservationNature: updateData[1],
           },
         });
   
       case 'Minor':
         return this.prisma.reservationAuberge.update({
           where: {
             reservationId,
           },
           data: {
             Minor: updateData[1],
           },
         });
   
       default:
         throw new Error('Invalid field');
     }
   }
   // services/reservations-auberge.service.ts

   async validateReservation(
     reservationId: number,
     newState: 'Accepted' | 'Rejected',
   ): Promise<ReservationAuberge> {
     // Fetch the reservation
     const reservation = await this.prisma.reservationAuberge.findUnique({
       where: { reservationId },
     });
   
     if (!reservation) {
       throw new NotFoundException(`Reservation with ID ${reservationId} not found.`);
     }
   
     // Use switch to handle state validation and transition
     switch (reservation.reservationState) {
       case ReservationState.pending:
          let state 
         if (newState === 'Accepted' || newState === 'Rejected') {
          if(newState === 'Accepted'){
               state = ReservationState.accepted
          }else if (newState === 'Rejected'){
               state = ReservationState.rejected
          }else
           return await this.prisma.reservationAuberge.update({
             where: { reservationId },
             data: {
               reservationState: newState,
             },
           });
         }
         throw new ConflictException(`Invalid state transition to "${newState}".`);
   
       case ReservationState.accepted:
       case ReservationState.rejected:
         throw new ConflictException(
           `Reservation with ID ${reservationId} is already "${reservation.reservationState}".`,
         );
   
       default:
         throw new Error('Invalid reservation state.');
     }
   }
   
  // Delete Reservation for Auberge
  async deleteReservationAuberge(reservationId: number) {
    return await this.prisma.reservationAuberge.delete({
      where: { reservationId },
    });
  }
}
