import express, { Request, Response } from 'express';
import { NotAuthorisedError, NotFoundError, requireAuth } from '@martiorg/common';

import { Order, OrderStatus } from '../models/orders';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

//consider changing it to PATCH in the future
router.delete('/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');
    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorisedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    //publish the event to notify other services that the order was cancelled
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticketId: order.ticket.id,
      status: order.status
    });

    res.status(204).send(order);
  })


export { router as deleteOrderRouter };