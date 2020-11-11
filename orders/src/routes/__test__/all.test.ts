import request from 'supertest';

import { app } from '../../app';
import { authHelper } from '../../test/authHelper';
import { Ticket } from '../../models/ticket';

const createTestTicket = async () => {
  const ticket = Ticket.createTicket({
    title: 'newtestticket',
    price: 19
  });

  await ticket.save();
  return ticket;
}

it('fetches orders for a particular user', async () => {
  //create three tickets and two users
  const ticket1 = await createTestTicket();
  const ticket2 = await createTestTicket();
  const ticket3 = await createTestTicket();

  const user1 = authHelper();
  const user2 = authHelper();

  //create one order as user#1
  await request(app)
    .post('/api/orders')
    .set('Cookie', user1)
    .send({ ticketId: ticket1.id })
    .expect(201);

  //create two orders as user#2
  //rename body for convenience
  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({ ticketId: ticket2.id })
    .expect(201);

  const { body: orderTwo } = await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({ ticketId: ticket3.id })
    .expect(201);

  //make a request to get orders for user#2
  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', user2)
    .expect(200);

  //make sure we only got the orders for user#2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(orderOne.id);
  expect(response.body[1].id).toEqual(orderTwo.id);
  expect(response.body[0].ticket.id).toEqual(ticket2.id);
  expect(response.body[1].ticket.id).toEqual(ticket3.id);
});
