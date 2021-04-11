import Response from '../../utils/response';
import Otp from '../../features/verify/verify.modal';
import Router from '../../config';
import { verifyErrorsHelper, errorsHelper } from './otp.util';
import jwt from 'jsonwebtoken';

const optMiddleware = {
  generateOtp: async (req, res) => {
    // encode
    var token = jwt.sign({ username: 'rumbiiha', firstname: 'rumbiiha' }, 'shhhhh');
    console.log(token);
    const { expiry, otplen, senderName, msg } = req.service;
    const { msisdn } = req.params;
    const response = await Router.get(
      `/OtpApi/otpgenerate?msisdn=${msisdn}&otplen=${otplen}&exptime=${expiry}&source=${senderName}&msg=${msg}`
    );
    if (errorsHelper(response.data)) {
      return res.status(422).send(errorsHelper(response.data));
    }
    if (response.data.match('1701')) {
      return res.status(200).send({
        status: 701,
        message: 'Message submitted successfully.',
        data: {
          phone_number: response.data.split('|')[1],
          message_id: response.data.split('|')[2],
        },
      });
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
