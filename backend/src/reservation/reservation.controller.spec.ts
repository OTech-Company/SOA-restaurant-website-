/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.model';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post(':userId')
  async reserveTable(@Param('userId') userId: string, @Body() reservationData: Partial<Reservation>) {
    return this.reservationService.reserveTable(userId, reservationData);
  }

  @Get(':reservationId')
  async getReservation(@Param('reservationId') reservationId: string) {
    return this.reservationService.getReservation(reservationId);
  }

  @Delete(':reservationId')
  async cancelReservation(@Param('reservationId') reservationId: string) {
    return this.reservationService.cancelReservation(reservationId);
  }
}
