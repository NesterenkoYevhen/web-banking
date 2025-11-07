import { ICreditCard } from "./credit-card";

export interface ITransaction {
  id: string;
  cardId: string;
  senderName?: string;
  senderCardNumber?: number;
  recepientName?: string;
  recepientCardNumber?: number;
  assignment?: string;
  type: 'REPLENISHMENT' | 'TRANSFER_SENDER' | 'TRANSFER_RECEPIENT';
  date: Date;
  status: 'CONDUCTED' | 'REJECTED';
  amount: number;
  card: ICreditCard;
}