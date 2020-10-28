import mongoose from 'mongoose';

import { Password } from '../helpers/password';

/** interface describing the user schema properties */
interface IUser {
  email: string;
  password: string;
}

/** interface describing the user model properties */
interface IUserModel extends mongoose.Model<IUserDocument> {
  createUser(attrs: IUser): IUserDocument;
}

/** interface describing the user document properties */
interface IUserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

//custom safe user instantiation to help TS to protect user attributes
userSchema.statics.createUser = (attrs: IUser) => {
  return new User(attrs);
}

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export { User };