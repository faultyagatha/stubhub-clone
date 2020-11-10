import mongoose from 'mongoose';

/** very specific to the ORDER SERVICE
 * cannot be put in the common model
 */

/** interface describing the ticket schema properties */
interface ITicket {
  title: string;
  price: number;
};

/** interface describing the ticket document properties */
export interface ITicketDocument extends mongoose.Document {
  title: string;
  price: number;
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
  return new Ticket(attrs);
}

const Ticket = mongoose.model<ITicketDocument, ITicketModel>('Ticket', ticketSchema);

export { Ticket };
