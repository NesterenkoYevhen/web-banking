import { Subjects } from '../types/subjects';

export interface TransferCompletedEvent {
  subject: Subjects.TransferCompleted;
  data: {
    senderName: string;
    senderCardNumber: number;
    recepientName: string;
    recepientCardNumber: number;
    assignment: string;
    amount: number;
  };
}