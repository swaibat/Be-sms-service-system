import Response from '../../utils/response';
import Otp from '../features/verify/verify.modal';
import Router from '../config';

const optMiddleware = {

  generateOtp: (req, res) => {
    const { msisdn } = req.params;
    Otp.findById(req.keys, (err, data) => {
      if (err) return Response(res, 400, 'Create user failed', err);
      const { exptime, otplen, source, msg } = data;
      Router.get(
        `/OtpApi/otpgenerate?msisdn=${msisdn}&otplen=${otplen}&exptime=${exptime}&source=${source}&msg=${msg}`
      ).then((data) => Response(res, 200, '', data));
    });
  },

  verifyOtp: (req, res) => {
    const { msisdn, otp } = req.params;
    Router.get(`/OtpApi/checkotp?msisdn=${msisdn}&otp=${otp}`).then((data) =>
      Response(res, 200, '', data)
    );
  },

};

export default optMiddleware;
