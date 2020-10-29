import { CustomError } from './customError';

export class NotAuthorisedError extends CustomError {
  statusCode = 401;
  constructor() {
    super('You are not authorised');
    Object.setPrototypeOf(this, NotAuthorisedError.prototype);
  }

  serialiseErrors() {
    return [{ message: 'You are not authorised' }];
  }
};