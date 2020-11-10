import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@martiorg/common';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      //careful: potential coupling between services!! can be removed
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('Ticket id must be provided')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // const orders = await Order.find({});

    // res.send(orders);
    res.send({});
  })


export { router as createOrderRouter };