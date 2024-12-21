import { ConflictException, Injectable } from '@nestjs/common';
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
   

  // Delete Reservation for Auberge
  async deleteReservationAuberge(reservationId: number) {
    return await this.prisma.reservationAuberge.delete({
      where: { reservationId },
    });
  }
}
