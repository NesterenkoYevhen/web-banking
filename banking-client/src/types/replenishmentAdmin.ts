import { ICreditCard } from "./credit-card";
import { IUser } from "./user";

export interface IReplenishmentAdmin {
  id: string;
  user: IUser,
  card: ICreditCard,
  amount: number,
  approved: boolean,
  date: Date
};