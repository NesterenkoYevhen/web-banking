import { Message } from "node-nats-streaming";
import { Subjects, Listener, UserCreatedEvent } from "@ynbanking/common";
import { User } from "../../../models/user";
import { queueGroupName } from "../queue-group-name";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const { id, email, name, surname, gender, age } = data;
    const user = User.build({
      id, email, name, surname, gender, age
    });
    await user.save();

    msg.ack();
  }
}