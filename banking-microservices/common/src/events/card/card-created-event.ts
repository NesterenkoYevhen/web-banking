import { Subjects } from '../types/subjects';
import { CardColor } from './types/card-color';
import { CardType } from './types/card-type';
import { PaymentSystem } from './types/payment-system';

export interface CardCreatedEvent {
  subject: Subjects.CardCreated;
  data: {
    id: string;
    number: number;
    type: CardType;
    payment_system: PaymentSystem;
    color: CardColor;
    balance: number;
    userId: string;
    version: number;
  };
}