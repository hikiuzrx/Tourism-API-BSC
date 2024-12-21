// controllers/reservation.controller.ts

import {
     Controller,
     Get,
     Post,
     Patch,
     Delete,
     Param,
     Body,
     HttpStatus,
     ConflictException,
     NotFoundException,
   } from '@nestjs/common';
   import { ReservationsAubergeService } from './reservation-auberge.service'; // Adjust import as necessary
   import { CreateReservationAubergeDto, UpdateReservationAubergeDto } from './reservation-auberge.dto'; // Adjust DTO imports
   
   @Controller('reservations')
   export class ReservationController {
     constructor(private readonly reservationAubergeService: ReservationsAubergeService) {}
   
     // Create Reservation for Auberge
     @Post('auberge')
     async createReservationAuberge(
       @Body() createReservationData: CreateReservationAubergeDto,
     ) {
       try {
         const createdReservation = await this.reservationAubergeService.createReservationAuberge(createReservationData);
         return {
           statusCode: HttpStatus.CREATED,
           message: 'Reservation created successfully',
           data: createdReservation,
         };
       } catch (error) {
         throw error;
       }
     }
   
     // Get all Reservations for Auberge
     @Get('auberge')
     async getAllReservationsAuberge() {
       try {
         const reservations = await this.reservationAubergeService.getAllReservationsAuberge();
         return {
           statusCode: HttpStatus.OK,
           message: 'Reservations fetched successfully',
           data: reservations,
         };
       } catch (error) {
         throw error;
       }
     }
   
     // Get Reservation by ID for Auberge
     @Get('auberge/:reservationId')
     async getReservationAubergeById(@Param('reservationId') reservationId: number) {
       try {
         const reservation = await this.reservationAubergeService.getReservationAubergeById(reservationId);
         if (!reservation) {
           throw new NotFoundException('Reservation not found');
         }
         return {
           statusCode: HttpStatus.OK,
           message: 'Reservation fetched successfully',
           data: reservation,
         };
       } catch (error) {
         throw error;
       }
     }
   
     // Update Reservation for Auberge
     @Patch('auberge/:reservationId')
     async updateReservationAuberge(
       @Param('reservationId') reservationId: number,
       @Body() updateReservationData: UpdateReservationAubergeDto,
     ) {
       try {
         const updatedReservation = await this.reservationAubergeService.updateReservationAuberge(
           reservationId,
           Object.entries(updateReservationData), // Convert DTO object into the format [key, value]
         );
         return {
           statusCode: HttpStatus.OK,
           message: 'Reservation updated successfully',
           data: updatedReservation,
         };
       } catch (error) {
         if (error instanceof ConflictException) {
           throw new ConflictException(error.message);
         } else if (error instanceof NotFoundException) {
           throw new NotFoundException(error.message);
         }
         throw error; // For other types of errors, rethrow them
       }
     }
   
     // Delete Reservation for Auberge
     @Delete('auberge/:reservationId')
     async deleteReservationAuberge(@Param('reservationId') reservationId: number) {
       try {
         const deletedReservation = await this.reservationAubergeService.deleteReservationAuberge(reservationId);
         return {
           statusCode: HttpStatus.OK,
           message: 'Reservation deleted successfully',
           data: deletedReservation,
         };
       } catch (error) {
         throw error;
       }
     }
   }
   