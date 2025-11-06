import { Subjects } from '../types/subjects';

export interface CardUpdatedEvent {
  subject: Subjects.CardUpdated;
  data: {
    id: string;
    balance: number;
    version: number;
  };
}