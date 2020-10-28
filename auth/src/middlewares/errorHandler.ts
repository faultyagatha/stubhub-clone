import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../errors/customError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.log('error from middleware', err);
    return res
      .status(err.statusCode)
      .send({ errors: err.serialiseErrors() })
  }
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
};

