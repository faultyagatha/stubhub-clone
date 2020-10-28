import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { router as userRouter } from './routes/user';
import { router as signinRouter } from './routes/signin';
import { router as signupRouter } from './routes/signup';
import { router as signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';

const app = express();
app.set('trust proxy', true); //trust proxy (of ingress)
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: true
}));

//routes
app.use(userRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

//async is properly handled without next() by 'express-async-errors'
app.all('*', async (req, res) => { throw new NotFoundError() });
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
})