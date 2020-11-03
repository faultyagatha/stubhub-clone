import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@martiorg/common';
import { currentUser } from '@martiorg/common';

import { createTicketRouter } from './routes/new';

export const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test' //set value depending on our env
  })
);

app.use(currentUser); //goes to requireAuth middleware on all protected routes
app.use(createTicketRouter);

//async is properly handled without next() by 'express-async-errors'
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

