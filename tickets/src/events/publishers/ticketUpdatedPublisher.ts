import { TicketUpdatedEvent, Publisher, Subjects } from '@martiorg/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}