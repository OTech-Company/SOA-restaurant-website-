/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface Reservation extends Document {
  userId: string; // Reference to User
  branch: string;
  tableNumber: number;
  date: Date;
  time: string;
  numberOfGuests: number;
}

export const ReservationSchema = new Schema({
  userId: { type: String, required: true },
  branch: { type: String, required: true },
  tableNumber: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  numberOfGuests: { type: Number, required: true },
});

export const ReservationModel = model<Reservation>('Reservation', ReservationSchema);
