import { Subjects } from '../types/subjects';

export interface UserCreatedEvent {
  subject: Subjects.UserCreated;
  data: {
    id: string;
    email: string;
    password: string;
    name: string;
    surname: string
    gender: string;
    age: number;
    version: number;
  };
}