import { OrderCreatedEvent, Publisher, Subjects } from '@martiorg/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}