import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ICar, IReturnCarBooking } from './car.interface';
import { Car } from './car.model';
import { Booking } from '../Booking/booking.model';
import mongoose from 'mongoose';

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

const deleteACarFromDB = async (id: string) => {
  const result = await Car.isCarExists(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  const deletedCar = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );

  return deletedCar;
};

const returnCarUpdateInDB = async (payload: IReturnCarBooking) => {
  const bookingData = await Booking.findById(payload.bookingId);
  if (!bookingData) {
    throw new AppError(httpStatus.NOT_FOUND, 'This booking does not exists');
  }

  const carData = await Car.findById(bookingData.car);
  if (!carData) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Car does not exists');
  }

  if (carData.status == 'available') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This Car is not booked or returned already',
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await Car.findByIdAndUpdate(
      carData._id,
      {
        status: 'available',
      },
      {
        runValidators: true,
        new: true,
        session,
      },
    );

    const [startTimeInHours, startTimeInMinutes] =
      bookingData.startTime.split(':');
    const [endTimeInHours, endTimeInMinutes] = payload.endTime.split(':');

    const totalStartTime =
      (Number(startTimeInHours) * 60.0 + Number(startTimeInMinutes)) / 60.0;
    const totalEndTime =
      (Number(endTimeInHours) * 60.0 + Number(endTimeInMinutes)) / 60.0;

    const totalCost = (totalEndTime - totalStartTime) * carData.pricePerHour;

    const updatedBooking = await Booking.findByIdAndUpdate(
      payload.bookingId,
      {
        endTime: payload.endTime,
        totalCost: totalCost,
      },
      {
        runValidators: true,
        new: true,
        session,
      },
    )
      .populate('user')
      .populate('car');

    await session.commitTransaction();
    await session.endSession();

    return updatedBooking;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateACarInDB,
  deleteACarFromDB,
  returnCarUpdateInDB,
};
