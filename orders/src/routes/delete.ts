import express, { Request, Response } from 'express';
import { NotAuthorisedError, NotFoundError, requireAuth } from '@martiorg/common';

import { Order, OrderStatus } from '../models/orders';

const router = express.Router();

//consider changing it to PATCH in the future
router.delete('/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorisedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    res.status(204).send(order);
  })


export { router as deleteOrderRouter };