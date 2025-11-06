import { Message } from "node-nats-streaming";
import { Subjects, Listener, ReplenishmentCreatedEvent } from "@ynbanking/common";
import { Replenishment } from "../../../models/replenishment";
import { queueGroupName } from "../queue-group-name";

export class ReplenishmentCreatedListener extends Listener<ReplenishmentCreatedEvent> {
  subject: Subjects.ReplenishmentCreated = Subjects.ReplenishmentCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: ReplenishmentCreatedEvent['data'], msg: Message) {

    const replenishment = Replenishment.build(data);
    await replenishment.save();

    msg.ack();
  }
}