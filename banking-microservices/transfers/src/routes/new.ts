import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { InsufficientFunds, NotAuthorizedError, NotFoundError, RecepientCardDoesNotExist, requireAuth, validateRequest } from "@ynbanking/common";
import { natsWrapper } from "../nats-wrapper";
import { Card } from "../models/card";
import { Transfer } from "../models/transfer";
import { TransferCompletedPublisher } from "../events/publishers/transfer-completed-publisher";
import { TransferRejectedPublisher } from "../events/publishers/transfer-rejected-publisher";

const router = Router();

router.post(
  '/api/transfers', 
  requireAuth,
  [
    body('senderName')
      .not()
      .isEmpty()
      .withMessage('Sender name is required'),
    body('senderCardNumber')
      .not()
      .isEmpty()
      .withMessage('Sender card number is required'),
    body('recepientName')
      .not()
      .isEmpty()
      .withMessage('Recepient name is required'),
    body('recepientCardNumber')
      .not()
      .isEmpty()
      .withMessage('Recepient card number is required'),
    body('assignment')
      .not()
      .isEmpty()
      .withMessage('Assignment is required'),
    body('amount')
      .isInt({ min: 0 })
      .withMessage('Amount must be greater than 0')
  ],
  validateRequest, 
  async (req: Request, res: Response) => {
    const { senderName, senderCardNumber, recepientName, recepientCardNumber, assignment, amount } = req.body;

    const senderCard = await Card.findOne({number: senderCardNumber});

    if(!senderCard) {
      throw new NotFoundError();
    }

    if(senderCard.balance - amount < 0) {
      await new TransferRejectedPublisher(natsWrapper.client).publish({
        senderName,
        senderCardNumber,
        recepientName,
        recepientCardNumber,
        assignment,
        amount
      });

      throw new InsufficientFunds();
    }

    const recepientCard = await Card.findOne({number: recepientCardNumber});

    if(!recepientCard) {
      await new TransferRejectedPublisher(natsWrapper.client).publish({
        senderName,
        senderCardNumber,
        recepientName,
        recepientCardNumber,
        assignment,
        amount
      });
      throw new RecepientCardDoesNotExist();
    }

    if (senderCard.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    
    const transfer = Transfer.build({
      senderName,
      senderCardNumber,
      recepientName,
      recepientCardNumber,
      assignment,
      amount
    });

    await transfer.save();

    // Transfer completed event
    await new TransferCompletedPublisher(natsWrapper.client).publish({
      senderName,
      senderCardNumber,
      recepientName,
      recepientCardNumber,
      assignment,
      amount
    });
    // Delete Transfer

    res.status(201).send({ success: true });
  }
);

export { router as createTransferRouter }