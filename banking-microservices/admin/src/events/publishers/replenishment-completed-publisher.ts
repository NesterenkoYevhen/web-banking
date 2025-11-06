import { ReplenishmentCompletedEvent, Publisher, Subjects } from '@ynbanking/common';

export class ReplenishmentCompletedPublisher extends Publisher<ReplenishmentCompletedEvent> {
  subject: Subjects.ReplenishmentCompleted = Subjects.ReplenishmentCompleted;
}