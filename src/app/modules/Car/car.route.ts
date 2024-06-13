import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CarValidations } from './car.validation';
import { CarControllers } from './car.controller';

const router = express.Router();

router
  .route('/')
  .post(
    validateRequest(CarValidations.createCarValidationSchema),
    CarControllers.createCar,
  );

export const CarRoutes = router;
