import { TErrorMessages, TGenericErrorResponse } from '../interfaces/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // handling duplicate errors
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorMessages: TErrorMessages = [
    {
      path: '',
      message: `${extractedMessage} is already exists!`,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Error!',
    errorMessages,
  };
};

export default handleDuplicateError;
