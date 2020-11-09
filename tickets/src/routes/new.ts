import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '@martiorg/common';
import { validateRequest } from '@martiorg/common';

import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from '../events/publishers/ticketCreatedPublisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/tickets',
  requireAuth,
  [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.createTicket({
      title,
      price,
      userId: req.currentUser!.id
    });
    await ticket.save();
    //publish a new event
    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId
    });

    console.log(ticket);
    res.sendStatus(201).send(ticket);
  });

export { router as createTicketRouter };