/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from './reservation.model';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel('Reservation', 'reservationsDB') private readonly reservationModel: Model<Reservation>,
  ) {}

  async reserveTable(userId: string, data: Partial<Reservation>): Promise<Reservation> {
    const newReservation = new this.reservationModel({ userId, ...data });
    return newReservation.save();
  }

  async getReservation(reservationId: string): Promise<Reservation> {
    const reservation = await this.reservationModel.findById(reservationId).exec();
    if (!reservation) throw new NotFoundException('Reservation not found');
    return reservation;
  }

  async cancelReservation(reservationId: string): Promise<void> {
    const result = await this.reservationModel.findByIdAndDelete(reservationId).exec();
    if (!result) throw new NotFoundException('Reservation not found');
  }
}
