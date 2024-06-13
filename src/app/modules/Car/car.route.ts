import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CarValidations } from './car.validation';
import { CarControllers } from './car.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router
  .route('/')
  .get(CarControllers.getAllCars)
  .post(
    auth(USER_ROLE.admin),
    validateRequest(CarValidations.createCarValidationSchema),
    CarControllers.createCar,
  );

router
  .route('/:id')
  .get(CarControllers.getSingleCar)
  .put(
    auth(USER_ROLE.admin),
    validateRequest(CarValidations.updateCarValidationSchema),
    CarControllers.updateSingleCar,
  )
  .delete(auth(USER_ROLE.admin), CarControllers.deleteSingleCar);

export const CarRoutes = router;
