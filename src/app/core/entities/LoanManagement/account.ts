import { User } from "../user";
import { Transaction } from "./transaction";

export enum Account_Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CLOSED = 'CLOSED',
  // Add other statuses if necessary
}

export class Account {
  id!: number;
  amount!: number;
  status!: Account_Status;
  created_at!: Date;
  updated_at!: Date;
  type!: string;
  dailyTransactionLimit!: number;
  dailyTransactionTotal!: number;
  lastTransactionDate!: Date;
  transactions!: Transaction[];
  user!: User;

  // Method to calculate remaining transaction limit
  getRemainingTransactionLimit(): number {
    return this.dailyTransactionLimit - this.dailyTransactionTotal;
  }

  // Method to check if the account is active
  isActive(): boolean {
    return this.status === Account_Status.ACTIVE;
  }
}
