import { Message } from "node-nats-streaming";
import { Subjects, Listener, ReplenishmentCompletedEvent, NotFoundError } from "@ynbanking/common";
import { Card } from "../../models/card";
import { queueGroupName } from "./queue-group-name";
import { CardUpdatedPublisher } from "../publishers/card-updated-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class ReplenishmentCompletedListener extends Listener<ReplenishmentCompletedEvent> {
  subject: Subjects.ReplenishmentCompleted = Subjects.ReplenishmentCompleted;

  queueGroupName = queueGroupName;

  async onMessage(data: ReplenishmentCompletedEvent['data'], msg: Message) {
    const { cardId, amount, approved } = data;

    if(!approved) {
      return msg.ack();
    }

    const card = await Card.findById(cardId);

    if(!card) {
      throw new NotFoundError();
    }
    const balance = card.balance + amount;

    card.set({ balance });

    await card.save();

    await new CardUpdatedPublisher(natsWrapper.client).publish({
      id: card.id,
      balance: card.balance,
      version: card.version
    })

    msg.ack();
  }
}