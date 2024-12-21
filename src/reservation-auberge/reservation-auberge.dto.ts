// dto/update-reservation.dto.ts

import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ReservationState, ReservationNature } from '@prisma/client';

export class UpdateReservationAubergeDto {
  @IsString()
  @IsOptional()
  roomNumber?: number;

  @IsString()
  @IsOptional()
  DateOfEnter?: Date;

  @IsString()
  @IsOptional()
  DateOfExist?: Date;

  @IsEnum(ReservationState)
  @IsOptional()
  reservationState?: ReservationState;

  @IsEnum(ReservationNature)
  @IsOptional()
  reservationNature?: ReservationNature;

  @IsOptional()
  @IsInt()
  @Min(0)
  Minor?: boolean;
}
// reservation-auberge.dto.ts

export class CreateReservationAubergeDto {
     reserveTo: number;
     reserveFor: number;
     roomNumber: number;
     cardId: number;
     minor?: boolean;
     DateOfEnter: Date;
     DateOfExist: Date;
     reservationState: ReservationState;
     reservationNature: ReservationNature;
   }
   
