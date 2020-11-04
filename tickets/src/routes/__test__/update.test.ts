import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';
import { authHelper } from '../../test/authHelper';

it('returns 404 if the provided id does not exist', async () => {
  const testId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${testId}`)
    .set('Cookie', authHelper())
    .send({
      title: 'validtitle',
      price: 19
    })
    .expect(404);
});

it('returns 401 if the user is not logged in', async () => {
  const testId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${testId}`)
    .send({
      title: 'validtitle',
      price: 19
    })
    .expect(401);
});

it('returns 401 if the user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', authHelper())
    .send({
      title: 'validtitle',
      price: 19
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', authHelper())
    .send({
      title: 'newtitle',
      price: 1
    })
    .expect(401);
});

it('returns 400 if the invalid title or price are provided', async () => {
  const cookie = authHelper();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'validtitle',
      price: 19
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'alskdfjj',
      price: -10,
    })
    .expect(400);
});

it('updates a ticket if all conditions are met', async () => {
  const cookie = authHelper();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'validtitle',
      price: 19
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 100
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual('new title');
  expect(ticketResponse.body.price).toEqual(100);
});