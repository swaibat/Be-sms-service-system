import User from "./user.modal";
import AuthUtil from "./auth.util";
import Response from "../../utils/response";

const userController = {
  login: (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err) return Response(res, 401, "user does not exist");
      if (AuthUtil.comparePassword(password, user.password)) {
        user.password = undefined;
        const token = AuthUtil.createToken({
          _id: user._id,
          email: user.email,
        });
        return Response(res, 200, "login successful", { user, token });
      }
      return Response(res, 401, "Invalid login details");
    });
  },
};

export default userController;
