import express from "express";
import Auth from '../../../features/auth/auth.middleware'
import OtpController from './verify.controller'

const router = express.Router();

router.post("/generate/:msisdn", Auth.getServiceTokenDetails, OtpController.generateOtp );
router.post("/verify/:msisdn", OtpController.verifyOtp );

export default router;