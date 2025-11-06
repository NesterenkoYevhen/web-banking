import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@ynbanking/common';
import cors from 'cors';

import { indexTransactionsRouter } from './routes/index';

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

app.use(currentUser);

app.use(indexTransactionsRouter);

app.all('/*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };