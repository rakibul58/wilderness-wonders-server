import { ICar } from './car.interface';
import { Car } from './car.model';

const createCarIntoDB = async (payload: ICar) => {
  const result = await Car.create(payload);
  return result;
};

export const CarServices = { createCarIntoDB };
