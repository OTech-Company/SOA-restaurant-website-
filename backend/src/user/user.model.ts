/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface User extends Document {
  readonly firstname: string;
  readonly lastname: string;
}

export const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

export const UserModel = model<User>('UserSchema', UserSchema);
