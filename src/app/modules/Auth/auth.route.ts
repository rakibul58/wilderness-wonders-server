import express from 'express';

const router = express.Router();

router.route('/signup').post();

export const AuthRoutes = router;
