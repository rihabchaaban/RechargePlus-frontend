import { Loan } from "./loan";

export class Repayment {
  idRepayment!: number;
  expectedPaymentDate!: Date;
  actualPaymentDate!: Date;
  monthly_amount!: number;
  interest!: number;
  status!: Repayment_Status;
  remainingPrincipal!: number;
  repaidPrincipal!: number;
  loan!: Loan;
}

export enum Repayment_Status {
    IN_PROGRESS = 'IN_PROGRESS',
    REPAID = 'REPAID',
    DEFAULT = 'DEFAULT',
    REPAID_LATE = 'REPAID_LATE',
  // Add any other statuses your backend supports
}
