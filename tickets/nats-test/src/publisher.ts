import nats from 'node-nats-streaming';

/** client (stan): connects to the nats server and listens to it */
const stan = nats.connect('tickdev', 'abc', {
  url: 'http://localhost:4222'
});

stan.on('connect', () => {
  console.log('Publisher connected to nats');

  const data = JSON.stringify({
    id: 'test2664',
    title: 'testtitle',
    price: 20
  });

  stan.publish('ticket:created', data, () => {
    console.log('Event published');
  })
});