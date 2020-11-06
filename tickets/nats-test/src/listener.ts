import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';

import { TicketCreatedListener } from './events/TicketCreatedListener';

console.clear();

//generate a random string to get a unique id for each listener
const randomId = randomBytes(4).toString('hex');

/** client (stan): connects to the nats server and listens to it */
const stan = nats.connect('tickdev', randomId, {
  url: 'http://localhost:4222'
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed');
    process.exit();
  });
  new TicketCreatedListener(stan).listen();
});

//intercept interapt or terminate requests
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
