import { TicketCreatedEvent, Publisher, Subjects } from '@martiorg/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}