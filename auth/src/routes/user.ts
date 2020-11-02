import express, { Request, Response } from 'express';
import { currentUser } from '@martiorg/common';
import { requireAuth } from '@martiorg/common';

const router = express.Router();

router.get('/api/users/user',
  currentUser,
  // requireAuth,
  (req: Request, res: Response) => {
    res.send({ user: req.currentUser || null }); //send back null if the user is not logged in
  });

export { router as userRouter };