import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';
import { authHelper } from '../../test/authHelper';

it('returns a 404 if the ticket is not found', async () => {
  const testId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/tickets/${testId}`)
    .send()
    .expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const title = 'validtitle';
  const price = 20;

  //create a ticket
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', authHelper())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
