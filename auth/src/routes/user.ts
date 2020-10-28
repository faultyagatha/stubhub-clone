import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('api/users/user',
  (req: Request, res: Response) => {
    console.log('getting a user');
    res.send({});
  });

export { router };