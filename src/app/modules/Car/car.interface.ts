import { Model } from 'mongoose';

export interface ICar {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status?: 'available' | 'unavailable';
  features: string[];
  pricePerHour: number;
  isDeleted?: boolean;
}

export interface CarModel extends Model<ICar> {
  // eslint-disable-next-line no-unused-vars
  isCarExists(id: string): Promise<ICar>;
}
