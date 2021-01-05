import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@martiorg/common';

import { queueGroupName } from './queueGroupName';
import { Ticket } from '../../models/ticket';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.createTicket({
      id,
      title,
      price
    });
    await ticket.save();

    msg.ack();
  }
}