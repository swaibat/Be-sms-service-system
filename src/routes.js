import express from 'express';
import UserRoute from './features/auth/user.route'
import VerifyRoute from './features/verify/verify.route'
import checkout from './features/checkout/checkout.route'
const router = express.Router();

router.use('/auth', UserRoute)
router.use('/verify', VerifyRoute)
router.use('/checkout', checkout)

export default router;
