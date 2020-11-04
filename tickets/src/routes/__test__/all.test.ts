import request from 'supertest';

import { app } from '../../app';
import { authHelper } from '../../test/authHelper';

const createTestTicket = (): Promise<any> => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', authHelper())
    .send({
      title: 'testtitle',
      price: 19
    });
};

it('can fetch a list of tickets', async () => {
  await createTestTicket();
  await createTestTicket();
  await createTestTicket();

  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
});
