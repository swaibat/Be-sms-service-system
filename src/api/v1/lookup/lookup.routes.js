import express from "express";
import Auth from '../../../features/auth/auth.middleware'
import OtpController from './lookup.controller'

const router = express.Router();

router.post("/:msisdn", Auth.getServiceTokenDetails, OtpController.generateOtp );

export default router;