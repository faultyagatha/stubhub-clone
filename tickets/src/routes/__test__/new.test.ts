import request from 'supertest';

import { app } from '../../app';
import { authHelper } from '../../test/authHelper';
import { Ticket } from '../../models/ticket';

it('has a route handler listening to /api/tickets for post req', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});
  expect(response.status).not.toEqual(404);
});

it('can only be accessed when a user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});
  expect(response.status).toEqual(401);
});

it('returns a status other than 401 when a user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', authHelper())
    .send({});
  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', authHelper())
    .send({
      title: '',
      price: 19
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', authHelper())
    .send({
      title: 'sometitle',
      price: -19
    })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {
  //check how many records are in the db
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', authHelper())
    .send({
      title: 'validtitle',
      price: 19
    })
    .expect(201);
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});