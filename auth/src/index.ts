import express from 'express';
import { json } from 'body-parser';

import { router as userRouter } from './routes/user';
import { router as signinRouter } from './routes/signin';
import { router as signupRouter } from './routes/signup';
import { router as signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(json());

//routes
app.use(userRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
})