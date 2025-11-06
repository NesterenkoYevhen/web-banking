import { Router, Request, Response } from "express";
import { NotAuthorizedError, NotFoundError, requireAuth } from "@ynbanking/common";
import { Card } from "../models/card";

const router = Router();

router.get('/api/cards/:cardId', requireAuth, async (req: Request, res: Response) => {
  const card = await Card.findById(req.params.orderId);

  if(!card) {
    throw new NotFoundError();
  }

  if(card.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  res.send(card);
});

export { router as showCardRouter };