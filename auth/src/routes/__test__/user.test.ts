import request from 'supertest';

import { app } from '../../app';
import { authHelper } from '../../test/authHelper';

it('returns null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/user')
    .send()
    .expect(200); //OK
  //expect(response.body.errors[0].message).toEqual('You are not authorised');
  expect(response.body.user).toEqual(null);
});

it('returns details of the current user', async () => {
  const cookie = await authHelper();
  const response = await request(app)
    .get('/api/users/user')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(response.body.user.email).toEqual('test@test.com');
});

/*
const signupResponse = await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201);
const cookie = signupResponse.get('Set-Cookie');
const response = await request(app)
  .get('/api/users/user')
  .set('Cookie', cookie)
  .send()
  .expect(200);
expect(response.body.user.email).toEqual('test@test.com');
});
*/

