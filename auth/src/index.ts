import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';


import { userRouter } from './routes/user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';

// const app = express();
// app.set('trust proxy', true); //trust proxy (of ingress)
// app.use(json());
// app.use(cookieSession({
//   signed: false,
//   secure: true
// }));

// //routes
// app.use(userRouter);
// app.use(signinRouter);
// app.use(signupRouter);
// app.use(signoutRouter);

// //async is properly handled without next() by 'express-async-errors'
// app.all('*', async (req, res) => { throw new NotFoundError() });
// app.use(errorHandler);

// const start = async () => {
//   if (!process.env.JWT_KEY) { throw new Error('JWT_KEY must be defined') };
//   try {
//     await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true
//     });
//     console.log('Connected to Mongo DB');
//   } catch (err) {
//     console.log('Mongo DB connection error', err);
//   }
// };

// const port = 3000;
// app.listen(port, () => {
//   console.log(`listening on ${port}`);
// });

// start();

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

app.use(userRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
