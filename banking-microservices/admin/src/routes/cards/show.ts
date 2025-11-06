import { Router, Request, Response } from "express";
import { NotFoundError } from "@ynbanking/common";
import { Card } from "../../models/card";

const router = Router();

router.get('/api/admin/users/:userId/cards/:cardId', async (req: Request, res: Response) => {
  const card = await Card.findById(req.params.cardId);

  if(!card) {
    throw new NotFoundError();
  }

  res.send(card);
});

export { router as showCardRouter };