import express, { NextFunction, Request, Response } from 'express';

import { NotAuthorisedError } from '../errors/notAuthorisedError';

/** will run AFTER currentUserHandler */
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorisedError();
  }
  next();
};