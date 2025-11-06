import { Message } from "node-nats-streaming";
import { Subjects, Listener, ReplenishmentCompletedEvent, NotFoundError } from "@ynbanking/common";
import { Card } from "../../models/card";
import { OperationType, StatusType, Transaction } from "../../models/transaction";
import { queueGroupName } from "./queue-group-name";

export class ReplenishmentCompletedListener extends Listener<ReplenishmentCompletedEvent> {
  subject: Subjects.ReplenishmentCompleted = Subjects.ReplenishmentCompleted;

  queueGroupName = queueGroupName;

  async onMessage(data: ReplenishmentCompletedEvent['data'], msg: Message) {
    const { cardId, amount, approved } = data;

    const card = await Card.findById(cardId);

    if(!card) {
      throw new NotFoundError();
    }

    const status = approved ? StatusType.Conducted : StatusType.Rejected;

    const transaction = Transaction.build({
      cardId: card.id,
      userId: card.userId,
      type: OperationType.Replenishment,
      date: new Date(),
      status,
      amount
    });

    await transaction.save();

    msg.ack();
  }
}