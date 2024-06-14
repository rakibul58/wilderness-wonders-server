import mongoose from 'mongoose';
import { TErrorMessages, TGenericErrorResponse } from '../interfaces/error';

// handling cast error
const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorMessages: TErrorMessages = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID!',
    errorMessages,
  };
};

export default handleCastError;
