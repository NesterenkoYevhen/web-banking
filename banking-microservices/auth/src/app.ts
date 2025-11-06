import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler, NotFoundError } from '@ynbanking/common';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { forgotPasswordRouter } from './routes/forgot-password';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cors());
app.use(
  cookieSession({
    sameSite: 'none',
    signed: false,
    secure: true,
  })
);
app.use(morgan('tiny'));

app.use(currentUserRouter);
app.use(forgotPasswordRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('/*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };