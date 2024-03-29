import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  NotAuthorisedError,
  requireAuth
} from '@martiorg/common';

import { Ticket } from '../models/ticket';
import { TicketUpdatedPublisher } from '../events/publishers/ticketUpdatedPublisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put('/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError
    }
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorisedError
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });

    await ticket.save();
    //publish the event 
    // TODO: better to save the event in the DB
    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId
    });

    res.send(ticket);
  });

export { router as updateTicketRouter };