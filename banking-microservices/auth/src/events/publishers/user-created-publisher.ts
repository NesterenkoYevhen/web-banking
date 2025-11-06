import { Publisher, Subjects, UserCreatedEvent} from '@ynbanking/common';

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}