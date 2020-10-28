import { ValidationError } from 'express-validator';

import { CustomError } from './customError';

export class RequestValidationError extends CustomError {
  errors: ValidationError[];
  statusCode = 400;
  constructor(errors: ValidationError[]) {
    super('Invalid request params');
    this.errors = errors;

    //only because we're extending the built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serialiseErrors() {
    return this.errors.map(e => {
      return {
        message: e.msg,
        field: e.param
      }
    });
  }
};
