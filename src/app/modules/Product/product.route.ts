import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CarValidations } from './product.validation';
import { CarControllers } from './product.controller';

const router = express.Router();

router.route('/').get(CarControllers.getAllCars).post(
  validateRequest(CarValidations.createCarValidationSchema), // validating with zod validation
  CarControllers.createCar,
);

router
  .route('/return')
  .put(
    validateRequest(CarValidations.returnCarBookingValidationSchema),
    CarControllers.returnCarUpdate,
  );

router
  .route('/:id')
  .get(CarControllers.getSingleCar)
  .put(
    validateRequest(CarValidations.updateCarValidationSchema),
    CarControllers.updateSingleCar,
  )
  .delete(CarControllers.deleteSingleCar); // checking if the user role is user

export const CarRoutes = router;
