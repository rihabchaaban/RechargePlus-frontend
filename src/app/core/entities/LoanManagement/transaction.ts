import { Account } from "./account";
import { Loan } from "./loan";


export enum Transaction_Status {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REVERSED = 'REVERSED',
  // Add other statuses if needed
}

export class Transaction {
  idTransaction!: number;
  createdAt!: Date;
  source!: string;
  destination!: string;
  amount!: number;
  status!: Transaction_Status;
  loan!: Loan;
  account!: Account;
//investmentRequest!: InvestmentRequest;
  fee!: number;
  isReversed!: boolean;
  reversalReason!: string;
  ipAddress!: string;
  originalTransaction!: Transaction;

  // Helper method to calculate total amount
  getTotalAmount(): number {
    return this.amount + this.fee;
  }

  // Helper method to check if the transaction can be reversed
  isReversible(): boolean {
    return !this.isReversed && this.status === Transaction_Status.COMPLETED;
  }

  // Helper method to extract destination account ID from the destination string
  getDestinationAccountId(): number {
    return Number(this.destination.replace('ACC-', ''));
  }
}
