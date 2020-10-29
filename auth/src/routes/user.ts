import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('api/users/user',
  (req: Request, res: Response) => {
    if (!req.session || !req.session.jwt) {
      return res.send({ currentUser: null });
    }

    try {
      const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
      res.send({ current: payload });
    } catch (err) {
      res.send({ currentUser: null });
    }
  });

export { router as userRouter };