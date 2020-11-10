import mongoose from 'mongoose';
import { OrderStatus } from '@martiorg/common';

import { ITicketDocument } from './ticket';

export { OrderStatus }; // expose to the ticket model for convenience

/** interface describing the order schema properties */
interface IOrder {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: ITicketDocument;
};

/** interface describing the order document properties */
interface IOrderDocument extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: ITicketDocument;
};

/** interface describing the order model properties */
interface IOrderModel extends mongoose.Model<IOrderDocument> {
  createOrder(attrs: IOrder): IOrderDocument;
};

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created
  },
  expiresAt: {
    type: mongoose.Schema.Types.Date
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket'
  }
},
  {
    toJSON: { //reshape the data on our model
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  });

//custom safe order instantiation to help TS to protect order attributes
orderSchema.statics.createOrder = (attrs: IOrder) => {
  return new Order(attrs);
}

const Order = mongoose.model<IOrderDocument, IOrderModel>('Order', orderSchema);

export { Order };