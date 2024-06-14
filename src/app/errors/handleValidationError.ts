import mongoose from 'mongoose';
import { TErrorMessages, TGenericErrorResponse } from '../interfaces/error';

// handling validation error
const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorMessages: TErrorMessages = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation error!',
    errorMessages,
  };
};

export default handleValidationError;
