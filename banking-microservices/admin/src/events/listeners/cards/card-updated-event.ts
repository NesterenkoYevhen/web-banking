import { Message } from "node-nats-streaming";
import { Subjects, Listener, CardUpdatedEvent, NotFoundError } from "@ynbanking/common";
import { Card } from "../../../models/card";
import { queueGroupName } from "../queue-group-name";

export class CardUpdatedListener extends Listener<CardUpdatedEvent> {
  subject: Subjects.CardUpdated = Subjects.CardUpdated;

  queueGroupName = queueGroupName;

  async onMessage(data: CardUpdatedEvent['data'], msg: Message) {
    const { balance } = data;

    const card = await Card.findByEvent(data);

    if(!card) {
      throw new NotFoundError();
    }

    card.set({ balance });

    await card.save();

    msg.ack();
  }
}