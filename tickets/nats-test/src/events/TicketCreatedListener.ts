import { Message } from 'node-nats-streaming';

import { Listener } from "./Listener";
import { Subjects } from './subjects';
import { TicketCreatedEvent } from "./TicketCreatedEvent";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  //protect data with type;  see interface TicketCreatedEvent
  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    msg.ack();
  }
};