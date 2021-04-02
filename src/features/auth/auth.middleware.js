import AuthUtil from "./auth.util";
import User from "./user.modal";
import Response from "../../utils/response";

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = AuthUtil.getToken(req);
    const { error, user } = AuthUtil.verifyToken(token);
    error && Response(res, 401, error.message.replace("jwt", "token"));
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    req.user = user;
    next();
  },

  findUser: async (req, res, next) => {
    User.findOne({ email: req.user.email }, (err, user) => {
      if (err) return Response({ message: "user does not exist", err });
      next();
    });
  },
};

export default authMiddleware;
