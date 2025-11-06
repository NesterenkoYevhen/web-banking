import { Message } from "node-nats-streaming";
import { Subjects, Listener, TransferCompletedEvent, NotFoundError } from "@ynbanking/common";
import { Card } from "../../models/card";
import { queueGroupName } from "./queue-group-name";
import { CardUpdatedPublisher } from "../publishers/card-updated-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class TransferCompletedListener extends Listener<TransferCompletedEvent> {
  subject: Subjects.TransferCompleted = Subjects.TransferCompleted;

  queueGroupName = queueGroupName;

  async onMessage(data: TransferCompletedEvent['data'], msg: Message) {
    const { senderCardNumber, recepientCardNumber, amount } = data;
    const senderCard = await Card.findOne({number: senderCardNumber});
    const recepientCard = await Card.findOne({number: recepientCardNumber});

    if(!senderCard || !recepientCard) {
      throw new NotFoundError();
    }

    const senderBalance = senderCard.balance - amount;
    const recepientBalance = recepientCard.balance + amount;

    senderCard.set({ balance: senderBalance });
    recepientCard.set({ balance: recepientBalance });

    await senderCard.save();
    await recepientCard.save();

    await new CardUpdatedPublisher(natsWrapper.client).publish({
      id: senderCard.id,
      balance: senderCard.balance,
      version: senderCard.version
    })

    await new CardUpdatedPublisher(natsWrapper.client).publish({
      id: recepientCard.id,
      balance: recepientCard.balance,
      version: recepientCard.version
    })

    msg.ack();
  }
}