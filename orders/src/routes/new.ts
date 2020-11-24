import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest
} from '@martiorg/common';
import mongoose from 'mongoose';

import { Order } from '../models/orders';
import { Ticket } from '../models/ticket';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();
const EXPIRES_SEC = 15 * 60; //cound be an env variable

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
    //find the ticket the user is trying to order
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }
    //make sure that the ticket is not already reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError('Ticket is already reserved');
    }

    //calculate an expiraion date for the order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRES_SEC);

    //create the order and save it in the DB
    const order = Order.createOrder({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket: ticket
    });
    await order.save();
    //publish an event that order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(), //returns a utc time zone
      ticket: {
        id: ticket.id,
        price: ticket.price
      }
    })

    res.status(201).send(order);
  })


export { router as createOrderRouter };