import express, { Request, Response } from 'express';

import { currentUser } from '../middlewares/authHandler';

const router = express.Router();

router.get('/api/users/user',
  currentUser,
  (req: Request, res: Response) => {
    res.send({ user: req.currentUser || null }); //send back null if the user is not logged in
  });

export { router as userRouter };