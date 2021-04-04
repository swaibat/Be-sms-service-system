import express from 'express';
import UserRoute from './features/auth/user.route';
import VerifyRoute from './features/verify/verify.route';
import checkout from './features/checkout/checkout.route';
import OtpApi from './api/otp.routes';
import Auth from './features/auth/auth.middleware';

const router = express.Router();

router.use('/auth', UserRoute);
router.use('/verify', Auth.verifyToken, VerifyRoute);
router.use('/payments', checkout);
router.use('/payments', checkout);
router.use('/otp', OtpApi);

export default router;
