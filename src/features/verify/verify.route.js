import express from 'express';
import Verify from './verify.modal';
import User from '../auth/user.modal';

const router = express.Router();

router.post('/', (req, res) => {
  if (!req.body.msg || !req.body.msg.match('{code}')) {
    return res.status(400).send({
      status: 400,
      message: 'make sure {code} exists in your message template',
    });
  }
  req.body.msg = req.body.msg.replace('{code}', '%m');
  req.body.userId = req.user._id;
  console.log('req.user', req.body);
  Verify.create(req.body, (err, verifyData) => {
    if (err) {
      return res.status(400).send({ message: 'profile creation failed', err });
    }
    return res.status(200).send({
      status: 200,
      data: verifyData,
    });
  });
});

router.get('/', (req, res) => {
  Verify.find({ userId: req.user._id }, (err, verifyData) => {
    if (err) {
      return res.status(400).send({ message: 'profile creation failed', err });
    }
    return res.status(200).send({
      status: 200,
      data: verifyData,
    });
  });
});

router.get('/user/:id', (req, res) => {
  Verify.find({}, (err, profiles) => {
    if (err) {
      res.status(400).send({ message: 'Create user failed', err });
    }
    res.status(200).send({
      status: 200,
      data: profiles,
    });
  });
});

export default router;
