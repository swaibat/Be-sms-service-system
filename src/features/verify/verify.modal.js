import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema(
  {
    profileName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
    expiry: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    otplen: {
      type: Number,
      required: true,
    },
    serviceToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Otp = mongoose.model('Otp', OtpSchema);

export default Otp;
