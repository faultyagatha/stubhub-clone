import { TicketCreatedEvent } from './TicketCreatedEvent';
import { Publisher } from './Publisher';
import { Subjects } from './subjects';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}