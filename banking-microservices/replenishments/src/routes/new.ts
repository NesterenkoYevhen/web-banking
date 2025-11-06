import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from "@ynbanking/common";
import { natsWrapper } from "../nats-wrapper";
import { Card } from "../models/card";
import { Replenishment } from "../models/replenishment";
import { ReplenishmentCreatedPublisher } from "../events/publishers/replenishment-created-publisher";

const router = Router();

router.post(
  '/api/replenishments', 
  requireAuth,
  [
    body('cardId')
      .not()
      .isEmpty()
      .withMessage('Card ID is required'),
    body('amount')
      .isFloat({ min: 0 })
      .withMessage('Amount must be greater than 0')
  ],
  validateRequest, 
  async (req: Request, res: Response) => {
    const { cardId, amount } = req.body;

    const card = await Card.findById(cardId);

    if(!card) {
      throw new NotFoundError();
    }

    if (card.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    
    const replenishment = Replenishment.build({
      cardId,
      userId: req.currentUser!.id,
      amount
    });

    await replenishment.save();

    await new ReplenishmentCreatedPublisher(natsWrapper.client).publish({ 
      id: replenishment.id,
      cardId: replenishment.cardId,
      userId: replenishment.userId,
      amount: replenishment.amount,
      approved: replenishment.approved,
      date: new Date(),
      version: replenishment.version
    });

    res.status(201).send({ success: true });
  }
);

export { router as createReplenishmentRouter }