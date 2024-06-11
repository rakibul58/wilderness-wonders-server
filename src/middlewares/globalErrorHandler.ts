/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  const statusCode = 500;
  const message = 'Something went wrong!';

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
};
