import { ReplenishmentCreatedEvent, Publisher, Subjects } from '@ynbanking/common';

export class ReplenishmentCreatedPublisher extends Publisher<ReplenishmentCreatedEvent> {
  subject: Subjects.ReplenishmentCreated = Subjects.ReplenishmentCreated;
}