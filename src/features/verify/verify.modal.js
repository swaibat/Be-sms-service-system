import mongoose from "mongoose";

const verifySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    exp_time: {
      type: String,
      required: true,
    },
    otp_len: {
      type: String,
      required: true,
    },
    msisdn: {
      type: String,
      required: true,
    },
    verify_token: {
      type: String,
      required: true,
    },
    user_id: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const Verify = mongoose.model("Verify", verifySchema);

export default Verify;
