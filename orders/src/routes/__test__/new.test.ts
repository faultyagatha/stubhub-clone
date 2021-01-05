import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';
import { authHelper } from '../../test/authHelper';
import { Order, OrderStatus } from '../../models/orders';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('returns an error if the ticket does not exist', async () => {
  const testTicketId = mongoose.Types.ObjectId();
  await request(app)
    .post('/api/orders')
    .set('Cookie', authHelper())
    .send({ ticketId: testTicketId })
    .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
  const ticket = Ticket.createTicket({
    id: '1234',
    title: 'testtitle',
    price: 19
  });
  await ticket.save();

  const order = Order.createOrder({
    userId: 'randomId',
    status: OrderStatus.Created,
    expiresAt: new Date(), //instantly expires but this is irrelevant for tests
    ticket: ticket
  })
  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', authHelper())
    .send({ ticketId: ticket.id })
    .expect(400);
});


it('reserves the ticket if everything is ok', async () => {
  const ticket = Ticket.createTicket({
    id: '1234',
    title: 'testtitle',
    price: 19
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', authHelper())
    .send({ ticketId: ticket.id })
    .expect(201);
});

//it.todo('emits an order created event');
it('emits an order created event', async () => {
  const ticket = Ticket.createTicket({
    id: '123',
    title: 'testtitle',
    price: 19
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', authHelper())
    .send({ ticketId: ticket.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});