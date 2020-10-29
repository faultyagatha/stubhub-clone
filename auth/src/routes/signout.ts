import express, { Request, Response } from 'express';

const router = express.Router();

router.post('api/users/signout',
  (req: Request, res: Response) => {
    //empty cookies
    req.session = null;
    console.log('signing out user');
    res.send({});
  });

export { router as signoutRouter };