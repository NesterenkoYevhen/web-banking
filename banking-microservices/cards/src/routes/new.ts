import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { CardColor, CardType, PaymentSystem, requireAuth, validateRequest } from "@ynbanking/common";
import { Card } from "../models/card";
import { CardCreatedPublisher } from "../events/publishers/card-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = Router();

router.post(
  '/api/cards', 
  requireAuth,
  [
    body('number')
      .not()
      .isEmpty()
      .withMessage('Number is required'),
    body('type')
      .isIn(Object.values(CardType))
      .withMessage('Card type must be CREDIT or DEBIT'),
    body('payment_system')
      .isIn(Object.values(PaymentSystem))
      .withMessage('Payment system must be MASTER_CARD or VISA'),
    body('color')
      .isIn(Object.values(CardColor))
      .withMessage('Card color must be DARK or GOLD')
  ],
  validateRequest, 
  async (req: Request, res: Response) => {
    const { number, type, payment_system, color, online_limit, offline_limit } = req.body;

    let card
    if(online_limit) {
      card = Card.build({
        number,
        type,
        payment_system,
        color,
        userId: req.currentUser!.id,
        online_limit,
        offline_limit
      })
    } else {
      card = Card.build({
        number,
        type,
        payment_system,
        color,
        userId: req.currentUser!.id
      })
    }

    await card.save();

    await new CardCreatedPublisher(natsWrapper.client).publish({ 
      id: card.id,
      number: card.number,
      type: card.type,
      payment_system: card.payment_system,
      color: card.color,
      balance: card.balance,
      userId: req.currentUser!.id,
      version: card.version
    });

    res.status(201).send(card);
  }
);

export { router as createCardRouter }