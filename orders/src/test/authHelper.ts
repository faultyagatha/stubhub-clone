import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

/** a helper function to auth a user */
export const authHelper = () => {

  //we need a unique id each time a test runs to test all routes correctly
  const testId = new mongoose.Types.ObjectId().toHexString();

  //build a JWT payload {id, email}
  const payload = {
    id: testId,
    email: 'test@test.com'
  };

  //create a JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //build session Object {jwt: MY_JWT}
  const session = { jwt: token };

  //turn the session into JSON
  const sessionJSON = JSON.stringify(session);

  //take a JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //return a string with the cookie with the encoded data
  return [`express:sess=${base64}`]; //array is for the supertest
};