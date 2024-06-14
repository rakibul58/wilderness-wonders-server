/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';
import { TErrorMessages } from '../interfaces/error';
import httpStatus from 'http-status';

// handling all handlers
export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  // dynamic error response object
  const dynamicResponse: {
    statusCode?: number;
    data?: unknown;
    message: string;
    errorMessages?: TErrorMessages;
    success: boolean;
    stack?: unknown;
  } = { message: 'Something went wrong!', success: false };

  // handling response for different types of data
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    dynamicResponse.message = simplifiedError?.message;
    dynamicResponse.errorMessages = simplifiedError?.errorMessages;
    dynamicResponse.stack = err.stack;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    dynamicResponse.message = simplifiedError?.message;
    dynamicResponse.errorMessages = simplifiedError?.errorMessages;
    dynamicResponse.stack = err.stack;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    dynamicResponse.message = simplifiedError?.message;
    dynamicResponse.errorMessages = simplifiedError?.errorMessages;
    dynamicResponse.stack = err.stack;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    dynamicResponse.message = simplifiedError?.message;
    dynamicResponse.errorMessages = simplifiedError?.errorMessages;
    dynamicResponse.stack = err.stack;
  } else if (
    err instanceof AppError &&
    err?.statusCode === httpStatus.NOT_FOUND &&
    err?.message === 'No Data Found'
  ) {
    statusCode = err?.statusCode;
    dynamicResponse.statusCode = err?.statusCode;
    dynamicResponse.message = err?.message;
    dynamicResponse.data = [];
    dynamicResponse.success = false;
  } else if (
    err instanceof AppError &&
    err?.statusCode === httpStatus.UNAUTHORIZED &&
    err?.message === 'You have no access to this route'
  ) {
    statusCode = err?.statusCode;
    dynamicResponse.statusCode = err?.statusCode;
    dynamicResponse.message = err?.message;
    dynamicResponse.success = false;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    dynamicResponse.message = err?.message;
    dynamicResponse.errorMessages = [
      {
        path: '',
        message: err.message,
      },
    ];
    dynamicResponse.stack = err.stack;
  } else if (err instanceof Error) {
    dynamicResponse.message = err?.message;
    dynamicResponse.errorMessages = [
      {
        path: '',
        message: err.message,
      },
    ];
    dynamicResponse.stack = err.stack;
  }

  return res
    .status(dynamicResponse.statusCode || statusCode)
    .json(dynamicResponse);
};
