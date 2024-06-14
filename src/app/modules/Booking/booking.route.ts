import express from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidations } from './booking.validation';

const router = express.Router();

router
  .route('/')
  .get(auth(USER_ROLE.admin), BookingControllers.getAllBooking)
  .post(
    validateRequest(BookingValidations.createBookingValidationSchema),
    auth(USER_ROLE.user),
    BookingControllers.createABooking,
  );

router
  .route('/my-bookings')
  .get(auth(USER_ROLE.user), BookingControllers.getIndividualBookings);

export const BookingRoutes = router;
