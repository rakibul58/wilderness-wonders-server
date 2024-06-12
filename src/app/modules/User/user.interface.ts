import { Model } from 'mongoose';

/* eslint-disable no-unused-vars */
export interface IUser {
  name: string;
  email: string;
  role: 'admin' | 'user';
  password?: string;
  phone: string;
  address: string;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export interface ISignInUser {
  email: string;
  password: string;
}
