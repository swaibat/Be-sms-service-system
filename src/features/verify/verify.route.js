import express from "express";
import Verify from "./verify.modal";
import User from "../auth/user.modal";

const router = express.Router();

router.post("/", (req, res) => {
//   Verify.create(req.body, (err, verifyData) => {
//     if (err) {
//       return res.status(400).send({ message: "Create user failed", err });
//     }
//     return res.status(200).send({
//       status: 200,
//       data: verifyData,
//     });
//   });
  Verify.remove({ })
});

router.get("/user/:id", (req, res) => {
  Verify.find({  }, (err, profiles) => {
    if (err) {
      res.status(400).send({ message: "Create user failed", err });
    }
    res.status(200).send({
      status: 200,
      data: profiles,
    });
  });
// const profiles = User.aggregate([
//     {
//       $lookup:
//         {
//           from: "verifys",
//           localField: "_id",
//           foreignField: "user_id",
//           as: "verify_profiles"
//         }
//    },
//    { $match : { email : "rswaiib@gmail.ccom" } }
// ]).pretty()

// console.log(profiles);

});

export default router;
