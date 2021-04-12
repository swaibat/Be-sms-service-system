import Response from '../../../utils/response';
import Otp from '../../../features/verify/verify.modal';
import Router from '../config';
import { verifyErrorsHelper, errorsHelper } from './lookup.util';
import jwt from 'jsonwebtoken';
import parsePhoneNumber from 'libphonenumber-js';
const ugValidation = (contact) => {
  if ('78'.match(contact)) {
    return 'MTN Uganda Limited';
  }
  if ('9'.match(contact)) {
    return 'Africell Uganda Limited';
  }
  if ('05'.match(contact)) {
    return 'Airtel Uganda Limited';
  }
};
const optMiddleware = {
  generateOtp: async (req, res) => {
    const phoneNumber = parsePhoneNumber(req.params.msisdn, 'UG');
    return res.status(200).send({
      valid: phoneNumber.isValid(),
      local_format: phoneNumber.nationalNumber,
      intl_format: phoneNumber.number,
      country_code: phoneNumber.country,
      country_name: 'United States of America',
      location: 'Novato',
      carrier: ugValidation(phoneNumber.nationalNumber[1]),
      line_type: phoneNumber.getType(),
    });
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
