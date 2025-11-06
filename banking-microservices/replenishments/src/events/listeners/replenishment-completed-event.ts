import { Message } from "node-nats-streaming";
import { Subjects, Listener, ReplenishmentCompletedEvent, NotFoundError } from "@ynbanking/common";
import { Card } from "../../models/card";
import { queueGroupName } from "./queue-group-name";
import { natsWrapper } from "../../nats-wrapper";
import { Replenishment } from "../../models/replenishment";

export class ReplenishmentCompletedListener extends Listener<ReplenishmentCompletedEvent> {
  subject: Subjects.ReplenishmentCompleted = Subjects.ReplenishmentCompleted;

  queueGroupName = queueGroupName;

  async onMessage(data: ReplenishmentCompletedEvent['data'], msg: Message) {
    const { id } = data;

    const replenishment = Replenishment.findByIdAndDelete(id)

    if(!replenishment) {
      throw new NotFoundError();
    }

    msg.ack();
  }
}