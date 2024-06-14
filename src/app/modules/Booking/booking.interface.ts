import { Types } from 'mongoose';

export interface IBooking {
  date: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
}

export interface ICreateBookingData {
  carId: string;
  date: string;
  startTime: string;
}
