import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ISignInUser, IUser } from '../User/user.interface';
import { User } from '../User/user.model';
import config from '../../config';

const registerUserIntoDB = async (payload: IUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  payload.password = payload.password || config.default_password;
  if (user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This email is already registered!'
    );
  }
  const result = await User.create(payload);
  const leanResult = result.toObject();
  delete leanResult.password;
  return leanResult;
};

const signInUserFromDB = async (payload: ISignInUser) => {
  // checking if the user exists
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');

  
};

export const AuthServices = { registerUserIntoDB, signInUserFromDB };
