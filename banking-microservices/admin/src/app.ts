import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError, requireAdmin } from '@ynbanking/common';
import cors from 'cors';

import { indexUserRouter } from './routes/users';
import { showUserRouter } from './routes/users/show';
import { indexCardRouter } from './routes/cards';
import { showCardRouter } from './routes/cards/show';
import { indexReplenishmentRouter } from './routes/replenishments';
import { updateReplenishmentRouter } from './routes/replenishments/update';

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
app.use(requireAdmin);

app.use(indexReplenishmentRouter);
app.use(updateReplenishmentRouter);
app.use(indexUserRouter);
app.use(showUserRouter);
app.use(indexCardRouter);
app.use(showCardRouter);


app.all('/*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };