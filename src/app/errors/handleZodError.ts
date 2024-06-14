import { ZodError, ZodIssue } from 'zod';
import { TErrorMessages, TGenericErrorResponse } from '../interfaces/error';

// handling zod errors
const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorMessages: TErrorMessages = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path?.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error!',
    errorMessages,
  };
};

export default handleZodError;
