import mongoose from 'mongoose';

/** interface describing the ticket schema properties */
interface ITicket {
  title: string;
  price: number;
  userId: string
};

/** interface describing the ticket document properties */
interface ITicketDocument extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
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
    required: true
  },
  userId: {
    type: String,
    required: true
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
  // console.log(new Ticket(attrs));
  return new Ticket(attrs);
}

const Ticket = mongoose.model<ITicketDocument, ITicketModel>('Ticket', ticketSchema);

export { Ticket };

// import mongoose from 'mongoose';

// interface TicketAttrs {
//   title: string;
//   price: number;
//   userId: string;
// }

// interface TicketDoc extends mongoose.Document {
//   title: string;
//   price: number;
//   userId: string;
// }

// interface TicketModel extends mongoose.Model<TicketDoc> {
//   build(attrs: TicketAttrs): TicketDoc;
// }

// const ticketSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     userId: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     toJSON: {
//       transform(doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//       },
//     },
//   }
// );

// ticketSchema.statics.build = (attrs: TicketAttrs) => {
//   return new Ticket(attrs);
// };

// const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

// export { Ticket };
