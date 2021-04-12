import Response from '../../../utils/response';
import Otp from '../../../features/verify/verify.modal';
import Router from '../config';
import { verifyErrorsHelper, errorsHelper } from './verify.util';
import jwt from 'jsonwebtoken';
import parsePhoneNumber from 'libphonenumber-js'

const optMiddleware = {
  generateOtp: async (req, res) => {
    const phoneNumber = parsePhoneNumber('758307272', 'UG')
    console.log(phoneNumber.isValid());
    const { senderName, msg, expiry } = req.service;
    const sender_id = senderName;
    const mobile = req.params.msisdn;
    const message = decodeURI(msg).replace('%m', '{code}');
    const reqData = { mobile, sender_id, message, expiry };
    try {
      const { data } = await Router.post(`verifier/send`, reqData);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(200).send(error);
    }
  },

  verifyOtp: async (req, res) => {
    const {
      params: { msisdn },
      query: { code },
    } = req;
    try {
      const response = await Router.get(
        `/OtpApi/checkotp?msisdn=${msisdn}&otp=${code}`
      );
      return res.status(200).send(verifyErrorsHelper(response.data));
    } catch (error) {
      console.log(error);
      return res.status(422).send(verifyErrorsHelper(response.data));
    }
  },
};

export default optMiddleware;
