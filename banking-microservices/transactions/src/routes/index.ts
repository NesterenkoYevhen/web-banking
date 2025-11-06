import { Router, Request, Response } from "express";
import { NotFoundError, requireAuth } from "@ynbanking/common";
import { Transaction } from "../models/transaction";
import { Card } from "../models/card";

const router = Router();

router.get('/api/transactions', requireAuth, async (req: Request, res: Response) => {
  const transactions = await Transaction.find({
    userId: req.currentUser!.id
  });

  const transactionsUpd = await Promise.all(transactions.map(async (transaction) => {
    const card = await Card.findById(transaction.cardId);
    if(!card) {
      throw new NotFoundError();
    }

    if((transaction.type === 'TRANSFER_SENDER') || (transaction.type ===  'TRANSFER_RECEPIENT')) {
      return {
        id: transaction.id,
        card,
        type: transaction.type,
        date: transaction.date,
        status: transaction.status,
        amount: transaction.amount,
        senderName: transaction.senderName,
        senderCardNumber: transaction.senderCardNumber,
        recepientName: transaction.recepientName,
        recepientCardNumber: transaction.recepientCardNumber,
        assignment: transaction.assignment
      };
    } else {
      return {
        id: transaction.id,
        card,
        type: transaction.type,
        date: transaction.date,
        status: transaction.status,
        amount: transaction.amount
      };
    }
    
  }));

  res.send(transactionsUpd);
});

export { router as indexTransactionsRouter };