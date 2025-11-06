import { TransferRejectedEvent, Publisher, Subjects } from '@ynbanking/common';

export class TransferRejectedPublisher extends Publisher<TransferRejectedEvent> {
  subject: Subjects.TransferRejected = Subjects.TransferRejected;
}