import mongoose from 'mongoose';

import { Order, OrderStatus } from './orders';

/** very specific to the ORDER SERVICE
 * cannot be put in the common model
 */

/** interface describing the ticket schema properties */
interface ITicket {
  id: string,
  title: string;
  price: number;
};

/** interface describing the ticket document properties */
export interface ITicketDocument extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
};

/** interface describing the ticket model properties */
interface ITicketModel extends mongoose.Model<ITicketDocument> {
  createTicket(attrs: ITicket): ITicketDocument;
};


const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
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

//custom safe ticket instantiation to help TS to protect ticket attributes
ticketSchema.statics.createTicket = (attrs: ITicket) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price
  });
};

//run query to look at all orders. 
//find an order where the ticket = ticket we found by id and the
//orders status is not cancelled
ticketSchema.methods.isReserved = async function (): Promise<boolean> {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete
      ]
    }
  });
  if (existingOrder) {
    return true;
  } else {
    return false;
  }
};

const Ticket = mongoose.model<ITicketDocument, ITicketModel>('Ticket', ticketSchema);

export { Ticket };
