import express, { Request, Response } from 'express';

const router = express.Router();

router.delete('/api/orders/:orderId', async (req: Request, res: Response) => {
  // const orders = await Order.find({});

  // res.send(orders);
  res.send({});
})


export { router as deleteOrderRouter };