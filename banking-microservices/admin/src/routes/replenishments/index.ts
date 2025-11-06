import { NotFoundError } from "@ynbanking/common";
import { Router, Request, Response } from "express";
import { Card } from "../../models/card";
import { Replenishment } from "../../models/replenishment";
import { User } from "../../models/user";

const router = Router();

router.get('/api/admin/replenishments', async (req: Request, res: Response) => {

  const replenishments = await Replenishment.find({});

  const replenishmentsUpd = await Promise.all(replenishments.map(async (replenishment) => {
    const user = await User.findById(replenishment.userId);
    const card = await Card.findById(replenishment.cardId);
    if(!card || !user) {
      throw new NotFoundError();
    }
    return {
      id: replenishment.id,
      user,
      card,
      amount: replenishment.amount,
      approved: replenishment.approved,
      date: replenishment.date
    }
  }));

  res.send(replenishmentsUpd);
});

export { router as indexReplenishmentRouter };