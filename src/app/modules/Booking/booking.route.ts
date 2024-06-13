import express from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.route('/').post(auth(USER_ROLE.user), BookingControllers.createABooking);

export const BookingRoutes = router;
