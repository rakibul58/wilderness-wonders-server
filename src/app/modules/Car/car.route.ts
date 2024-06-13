import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CarValidations } from './car.validation';
import { CarControllers } from './car.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router
  .route('/')
  .post(
    auth(USER_ROLE.admin),
    validateRequest(CarValidations.createCarValidationSchema),
    CarControllers.createCar,
  );

export const CarRoutes = router;
