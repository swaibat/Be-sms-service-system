import express from 'express';
import UserRoute from './features/auth/user.route';
import VerifyRoute from './features/verify/verify.route';
import Sms from './features/sms/sms.route';
import checkout from './features/checkout/checkout.route';
import OtpApi from './api/otp/otp.routes';
import Lookup from './api/lookup/lookup.routes';
import Auth from './features/auth/auth.middleware';
// API
import Verify from './api/v1/verify/verify.routes';
import LookUp from './api/v1/lookup/lookup.routes';

const router = express.Router();

router.use('/auth', UserRoute);
router.use('/verify', Auth.verifyToken, VerifyRoute);
router.use('/sms', Auth.verifyToken, Sms);
router.use('/payments', checkout);
router.use('/payments', checkout);
router.use('/api/v1/otp', OtpApi);
router.use('/number_lookup', Lookup);
router.use('/api/v2/otp', Verify);
router.use('/api/v2/lookup', LookUp);
export default router;
