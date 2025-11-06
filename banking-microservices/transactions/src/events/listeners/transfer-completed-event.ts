import { Message } from "node-nats-streaming";
import { Subjects, Listener, TransferCompletedEvent, NotFoundError } from "@ynbanking/common";
import { Card } from "../../models/card";
import { queueGroupName } from "./queue-group-name";
import { OperationType, StatusType, Transaction } from "../../models/transaction";

export class TransferCompletedListener extends Listener<TransferCompletedEvent> {
  subject: Subjects.TransferCompleted = Subjects.TransferCompleted;

  queueGroupName = queueGroupName;

  async onMessage(data: TransferCompletedEvent['data'], msg: Message) {
    const { senderName, senderCardNumber, recepientName, recepientCardNumber, assignment, amount } = data;
    const senderCard = await Card.findOne({number: senderCardNumber});
    const recepientCard = await Card.findOne({number: recepientCardNumber});

    if(!senderCard || !recepientCard) {
      throw new NotFoundError();
    }

    const transactionSender = Transaction.build({
      cardId: senderCard.id,
      userId: senderCard.userId,
      recepientName,
      recepientCardNumber,
      assignment,
      type: OperationType.TransferSender,
      date: new Date(),
      status: StatusType.Conducted,
      amount
    });

    const transactionRecepient = Transaction.build({
      cardId: recepientCard.id,
      userId: recepientCard.userId,
      senderName,
      senderCardNumber,
      assignment,
      type: OperationType.TransferRecepient,
      date: new Date(),
      status: StatusType.Conducted,
      amount
    });

    await transactionSender.save();
    await transactionRecepient.save();

    msg.ack();
  }
}