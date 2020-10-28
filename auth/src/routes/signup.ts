import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { RequestValidationError } from '../errors/requestValidationError';
import { BadRequestError } from '../errors/badRequestError';
import { User } from '../models/user';

const router = express.Router();

router.post(
  'api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //return res.status(400).send(errors.array);
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email in use');
    }
    const user = User.createUser({ email, password });
    await user.save();

    //generate JWT
    const token = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!);

    //store it on a session object
    req.session = {
      jwt: token
    };

    res.status(201).send(user);
  });

export { router as signupRouter };