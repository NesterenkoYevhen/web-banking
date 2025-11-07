export interface ICreditCard {
  id: string;
  number: number;
  type: string;
  payment_system: string;
  color: string;
  balance: number;
  userId: string;
  version: number;
  online_limit: number;
  offline_limit: number;
}