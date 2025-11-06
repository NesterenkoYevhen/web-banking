import { Message } from "node-nats-streaming";
import { Subjects, Listener, NotFoundError, TransferRejectedEvent } from "@ynbanking/common";
import { Card } from "../../models/card";
import { queueGroupName } from "./queue-group-name";
import { OperationType, StatusType, Transaction } from "../../models/transaction";

export class TransferRejectedListener extends Listener<TransferRejectedEvent> {
  subject: Subjects.TransferRejected = Subjects.TransferRejected;

  queueGroupName = queueGroupName;

  async onMessage(data: TransferRejectedEvent['data'], msg: Message) {
    const { senderCardNumber, recepientName, recepientCardNumber, assignment, amount } = data;
    const card = await Card.findOne({number: senderCardNumber});

    if(!card) {
      throw new NotFoundError();
    }

    const transaction = Transaction.build({
      cardId: card.id,
      userId: card.userId,
      recepientName,
      recepientCardNumber,
      assignment,
      type: OperationType.TransferSender,
      date: new Date(),
      status: StatusType.Rejected,
      amount
    });

    await transaction.save();

    msg.ack();
  }
}