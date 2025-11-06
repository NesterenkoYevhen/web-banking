import mongoose from 'mongoose';
import { app } from './app';
import { CardCreatedListener } from './events/listeners/cards/card-created-event';
import { CardUpdatedListener } from './events/listeners/cards/card-updated-event';
import { ReplenishmentCreatedListener } from './events/listeners/replenishments/replenishment-created-listener';
import { UserCreatedListener } from './events/listeners/users/user-created-listener';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  console.log('Starting up...');
  
  if(!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if(!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  if(!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }

  if(!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }

  if(!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  
  try {
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new UserCreatedListener(natsWrapper.client).listen();
    new CardCreatedListener(natsWrapper.client).listen();
    new CardUpdatedListener(natsWrapper.client).listen();
    new ReplenishmentCreatedListener(natsWrapper.client).listen();

    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000 🚀🚀🚀');
  });
};

start();