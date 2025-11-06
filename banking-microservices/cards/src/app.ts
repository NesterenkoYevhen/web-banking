import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@ynbanking/common';
import cors from 'cors';

import { createCardRouter } from './routes/new';
import { indexCardsRouter } from './routes/index';
import { showCardRouter } from './routes/show';

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

app.use(createCardRouter);
app.use(indexCardsRouter);
app.use(showCardRouter);

app.all('/*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };