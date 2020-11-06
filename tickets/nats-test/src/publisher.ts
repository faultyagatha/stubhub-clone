import nats from 'node-nats-streaming';

import { TicketCreatedPublisher } from './events/TicketCreatedPublisher';

/** client (stan): connects to the nats server and listens to it */
const stan = nats.connect('tickdev', 'abc', {
  url: 'http://localhost:4222'
});

stan.on('connect', async () => {
  console.log('Publisher connected to nats');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: 'test2664',
      title: 'testtitle',
      price: 20,
      userId: 'testId'
    });
  } catch (err) {
    console.log(err);
  }
});