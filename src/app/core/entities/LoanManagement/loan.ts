import { Guarantor } from "./guarantor";
import { Repayment } from "./repayment";
import { Transaction } from "./transaction";

export enum Loan_Status {
    IN_PROGRESS = 'IN_PROGRESS',
    REPAID = 'REPAID',
    DEFAULT = 'DEFAULT',
    REPAID_LATE = 'REPAID_LATE',
  // Add any other statuses you have in your backend
}

export class Loan {
  idLoan!: number;
  amount!: number;
  interestRate!: number;
  duration!: number; // in months
  caution!: number;
  status!: Loan_Status;
  request_date!: Date;
  total_repayment_amount!: number;
  remaining_repayment!: number;
  loanPdf!: Uint8Array; // For binary file data (PDF)
  transactions!: Transaction[];
  repayments!: Repayment[];
  guarantor!: Guarantor;
}
