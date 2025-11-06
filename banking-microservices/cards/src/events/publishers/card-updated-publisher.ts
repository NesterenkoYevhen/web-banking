import { CardUpdatedEvent, Publisher, Subjects } from '@ynbanking/common';

export class CardUpdatedPublisher extends Publisher<CardUpdatedEvent> {
  subject: Subjects.CardUpdated = Subjects.CardUpdated;
}