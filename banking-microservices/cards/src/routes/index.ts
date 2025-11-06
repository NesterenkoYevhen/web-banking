import { Router, Request, Response } from "express";
import { requireAuth } from "@ynbanking/common";
import { Card } from "../models/card";

const router = Router();

router.get('/api/cards', requireAuth, async (req: Request, res: Response) => {
  const cards = await Card.find({
    userId: req.currentUser!.id
  });

  res.send(cards);
});

export { router as indexCardsRouter };