import { Subjects } from '../types/subjects';

export interface TransferRejectedEvent {
  subject: Subjects.TransferRejected;
  data: {
    senderName: string;
    senderCardNumber: number;
    recepientName: string;
    recepientCardNumber: number;
    assignment: string;
    amount: number;
  };
}