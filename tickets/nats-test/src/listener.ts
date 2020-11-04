import nats, { Message } from 'node-nats-streaming';

console.clear();

/** client (stan): connects to the nats server and listens to it */
const stan = nats.connect('tickdev', '123', {
  url: 'http://localhost:4222'
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  const subscription = stan.subscribe('ticket:created');
  subscription.on('message', (msg: Message) => {
    //use 'rs' to restart the publisher in terminal to see the log below
    console.log('message received');
    const data = msg.getData();
    if (typeof data === 'string') {
      console.log(
        `Received event #${msg.getSequence()} with data: ${data}`);
    }
  });
});