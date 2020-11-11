import request from 'supertest';

import { app } from '../../app';
import { authHelper } from '../../test/authHelper';
import { Ticket } from '../../models/ticket';
import { Order } from '../../models/orders';

it('fetches the order', async () => {
  //create a ticket
  const ticket = Ticket.createTicket({
    title: 'testTicket',
    price: 9
  });
  await ticket.save();

  //make a req to create an order with the ticket
  const user = authHelper();
  //rename body for convenience
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  //make req to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  //console.log(order.id);
  expect(fetchedOrder.id).toEqual(order.id);
});

it('throws an error if a user tries to fetch another users order', async () => {
  //create a ticket
  const ticket = Ticket.createTicket({
    title: 'testTicket',
    price: 9
  });
  await ticket.save();

  //make a req to create an order with the ticket
  const user1 = authHelper();
  const user2 = authHelper();
  //rename body for convenience
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user1)
    .send({ ticketId: ticket.id })
    .expect(201);
  console.log(order.id);

  //make req to fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user2)
    .send()
    .expect(401);

});