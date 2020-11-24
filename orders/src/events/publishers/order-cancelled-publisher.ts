import { OrderCancelledEvent, Publisher, Subjects } from '@martiorg/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}