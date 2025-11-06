import { CardCreatedEvent, Publisher, Subjects } from '@ynbanking/common';

export class CardCreatedPublisher extends Publisher<CardCreatedEvent> {
  subject: Subjects.CardCreated = Subjects.CardCreated;
}