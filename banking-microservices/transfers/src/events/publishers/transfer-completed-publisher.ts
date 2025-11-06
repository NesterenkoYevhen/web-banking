import { TransferCompletedEvent, Publisher, Subjects } from '@ynbanking/common';

export class TransferCompletedPublisher extends Publisher<TransferCompletedEvent> {
  subject: Subjects.TransferCompleted = Subjects.TransferCompleted;
}