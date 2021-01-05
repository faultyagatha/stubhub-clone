import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: any;

//run mongodb in memory to run different tests simultaneously 
beforeAll(async () => {
  //temporary secret, only for testing purpose
  process.env.JWT_KEY = 'hfjhfjjs';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
});

//delete existing collestions
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});