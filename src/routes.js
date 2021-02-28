import express from 'express';
import UserRoute from './features/auth/user.route'

const router = express.Router();

router.use('/auth', UserRoute)

export default router;
