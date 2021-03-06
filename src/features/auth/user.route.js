import express from "express";
import User from "./user.modal";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(400).send({ message: "Create user failed", err });
    }
    res.status(200).send({
      status: 200,
      data: users,
    });
  });
});

router.get("/users/:id", (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "Create user failed", err });
    }
    res.status(200).send({
      status: 200,
      data: user,
    });
  });
});

router.post("/", (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, password) => {
      User.create({ ...req.body, password }, (err, user) => {
        if (err) {
          return res.status(400).send({ message: "Create user failed", err });
        }
        return res.status(200).send({
          status: 200,
          message: "registration successful",
          data: user,
        });
      });
    });
  });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        return res.status(400).send({ message: "Create user failed", err });
      }
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (result) {
          res.status(200).send({
            status: 200,
            data: user,
          });
        }
        return res.status(400).send({ message: "wrong login details", error });
      });
    });
});

export default router;
