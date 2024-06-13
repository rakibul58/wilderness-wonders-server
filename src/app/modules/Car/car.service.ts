import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ICar } from './car.interface';
import { Car } from './car.model';

const createCarIntoDB = async (payload: ICar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCarsFromDB = async () => {
  const result = await Car.find();
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return result;
};

const getSingleCarFromDB = async (id: string) => {
  const result = await Car.isCarExists(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return result;
};

const updateACarInDB = async (id: string, payload: Partial<ICar>) => {
  const result = await Car.isCarExists(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  const updatedCar = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedCar;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateACarInDB,
};
