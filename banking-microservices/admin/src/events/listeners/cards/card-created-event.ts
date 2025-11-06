import { Message } from "node-nats-streaming";
import { Subjects, Listener, CardCreatedEvent } from "@ynbanking/common";
import { Card } from "../../../models/card";
import { queueGroupName } from "../queue-group-name";

export class CardCreatedListener extends Listener<CardCreatedEvent> {
  subject: Subjects.CardCreated = Subjects.CardCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: CardCreatedEvent['data'], msg: Message) {

    const card = Card.build(data);
    await card.save();

    msg.ack();
  }
}