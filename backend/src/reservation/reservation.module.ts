/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationSchema } from './reservation.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reservation', schema: ReservationSchema }], 'reservationsDB'),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
