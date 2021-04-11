import express from "express";
import Auth from '../../features/auth/auth.middleware'
import VerifyController from './lookup.controller'

const router = express.Router();

router.post("/:msisdn", VerifyController.verifyOtp );

export default router;