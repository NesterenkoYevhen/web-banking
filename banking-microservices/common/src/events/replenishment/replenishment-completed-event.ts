import { Subjects } from '../types/subjects';

export interface ReplenishmentCompletedEvent {
  subject: Subjects.ReplenishmentCompleted;
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