import express from "express";
import Auth from '../features/auth/auth.middleware'
import OtpController from './otp.controller'

const router = express.Router();

router.post("/generate", Auth.verifyToken, Auth.findUser, OtpController.generateOtp );
router.post("/verify", Auth.verifyToken, Auth.findUser, OtpController.verifyOtp );

export default router;