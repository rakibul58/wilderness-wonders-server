import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ISignInUser, IUser } from '../User/user.interface';
import { User } from '../User/user.model';
import config from '../../config';
import { createToken } from './auth.utils';

const registerUserIntoDB = async (payload: IUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  payload.password = payload.password || config.default_password;
  if (user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This email is already registered!',
    );
  }
  const result = await User.create(payload);
  return result;
};

const signInUserFromDB = async (payload: ISignInUser) => {
  // checking if the user exists
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  if (
    !(await User.isPasswordMatched(payload?.password, user?.password as string))
  )
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const jwtPayload = {
    userId: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  user.password = '';

  return {
    accessToken,
    user,
  };
};

export const AuthServices = { registerUserIntoDB, signInUserFromDB };
