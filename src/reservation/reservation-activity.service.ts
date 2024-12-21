import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import * as bcrypt from 'bcrypt'
import { ReservationState, ReservationNature, User, ReservationAuberge, ReservationActivity } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: DbService) {}

  // Create a reservation for activity
  async createActivityReservation(data: any) {
    const { reserver, reservedfor, firstName, lastName, reservationState, reservationNature } = data;
    try {
      const activity = await this.prisma.activity.findUnique({
        where: { activityId: reservedfor },
      });

      if (!activity) {
        throw new NotFoundException('Activity not found');
      }

      const reservation = await this.prisma.reservationActivity.create({
        data: {
          reserver,
          reservedfor,
          firstName,
          lastName,
          reservationState,
          reservationNature,
        },
      });

      return reservation;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Fetch all activity reservations
  async getAllActivityReservations() {
    return await this.prisma.reservationActivity.findMany({
      include: {
        activity: true,
        user: true,
      },
    });
  }

  // Fetch a single activity reservation by ID
  async getActivityReservationById(reservationId: number) {
    const reservation = await this.prisma.reservationActivity.findUnique({
      where: { reservationId },
      include: {
        activity: true,
        user: true,
      },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return reservation;
  }

  // Delete an activity reservation
  async deleteActivityReservation(reservationId: number) {
    const reservation = await this.prisma.reservationActivity.findUnique({
      where: { reservationId },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return await this.prisma.reservationActivity.delete({
      where: { reservationId },
    });
  }

   async validateReservation(
     reservationId: number,
     newState: 'Accepted' | 'Rejected',
   ): Promise<ReservationActivity> {
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
           return await this.prisma.reservationActivity.update({
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
  // Update reservation state
  async updateUser(id: number, updateData: [string, string]): Promise<{ success: boolean; message: string; data: User | null }> {
     try {
       let existingUser: User | null;
   
       const [field, newValue] = updateData;
   
       switch (field) {
         case 'name':
           existingUser = await this.prisma.user.findFirst({
             where: { name: newValue },
           });
           if (existingUser) {
             throw new ConflictException('This name is already in use');
           }
           break;
   
         case 'email':
           existingUser = await this.prisma.user.findFirst({
             where: { email: newValue },
           });
           if (existingUser) {
             throw new ConflictException('Email is already in use');
           }
           break;
   
         case 'number':
           existingUser = await this.prisma.user.findFirst({
             where: { number: newValue }
           });
           if (existingUser) {
             throw new ConflictException('Number is already in use');
           }
           break;
   
         case 'password':
           const salt: string = await bcrypt.genSalt(10);
           const hashedPassword = await bcrypt.hash(newValue, salt);
           return {
             success: true,
             message: 'Password updated successfully',
             data: await this.prisma.user.update({
               where: { userId: id },
               data: { password: hashedPassword },
             }),
           };
   
         default:
           throw new BadRequestException(`Field '${field}' cannot be updated`);
       }
   
       // Perform the update if no conflicts are found
       const updatedUser = await this.prisma.user.update({
         where: { userId: id },
         data: { [field]: newValue },
       });
   
       return {
         success: true,
         message: `${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`,
         data: updatedUser,
       };
     } catch (error) {
       // Handle errors gracefully
       return {
         success: false,
         message: error.message || 'Failed to update user',
         data: null,
       };
     }
   }
   
}