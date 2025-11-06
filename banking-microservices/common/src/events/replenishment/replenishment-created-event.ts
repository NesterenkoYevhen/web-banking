import { Subjects } from '../types/subjects';

export interface ReplenishmentCreatedEvent {
  subject: Subjects.ReplenishmentCreated;
  data: {
    id: string;
    cardId: string;
    userId: string;
    amount: number;
    approved: boolean;
    version: number;
    date: Date;
  };
}