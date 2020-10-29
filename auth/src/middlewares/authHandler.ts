import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface IUserPayload {
  id: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      authUser?: IUserPayload;
    }
  }
};

export const authUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //check JWT
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as IUserPayload;
    req.authUser = payload;
  } catch (err) {

  }
  next();
}
