import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { userRouter } from './routes/user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';

export const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test' //set value depending on our env
  })
);

app.use(userRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

//async is properly handled without next() by 'express-async-errors'
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

