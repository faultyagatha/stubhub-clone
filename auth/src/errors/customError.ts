/** a guard class to protect the custom errors structure */

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serialiseErrors(): { message: string; field?: string }[];
}

/*
export type ErrorType = {
  value?: string;
  msg: string;
  param: string;
  location?: string;
}

export const formatError = (error: ErrorType[]): string => {
  const messages = error.map((obj: any) => obj.msg);
  const stringifiedMessage = messages.join(', ');
  console.log(stringifiedMessage);
  return stringifiedMessage;
};
*/