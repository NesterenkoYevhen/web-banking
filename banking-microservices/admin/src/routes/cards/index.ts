import { Router, Request, Response } from "express";
import { Card } from "../../models/card";

const router = Router();

router.get('/api/admin/users/:userId/cards', async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const cards = await Card.find({userId});

  res.send(cards);
});

export { router as indexCardRouter };