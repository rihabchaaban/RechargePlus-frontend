import { Component } from '@angular/core';
import { Loan } from 'src/app/core/entities/LoanManagement/loan';
import { LoanService } from 'src/app/core/services/LoanManagement/loan.service';

@Component({
  selector: 'app-loans-list',
  templateUrl: './loans-list.component.html',
  styleUrls: ['./loans-list.component.css']
})
export class LoansListComponent {

  loans: Loan[] = [];
  activeLoans: Loan[] = [];
  paidLoans: Loan[] = [];
  defaultLoans: Loan[] = [];

  constructor(private _loanService: LoanService) {
    this._loanService.getLoans().subscribe({
      next: (data: Loan[]) => {
        this.loans = data;
        this.filterLoans(); // Appelle la fonction de filtrage
        console.log('Fetched loans:', this.loans);
      },
      error: (err) => {
        console.error('Error fetching loans:', err);
      }
    });
  }

  private filterLoans(): void {
    this.activeLoans = this.loans.filter(loan => loan.status === 'IN_PROGRESS');
    this.paidLoans = this.loans.filter(loan => 
      loan.status === 'REPAID' || loan.status === 'REPAID_LATE'
    );
    this.defaultLoans = this.loans.filter(loan => loan.status === 'DEFAULT');
  }
  formatStatus(status: string): string {
    const map: { [key: string]: string } = {
      IN_PROGRESS: 'In Progress',
      REPAID: 'Repaid',
      REPAID_LATE: 'Repaid Late',
      DEFAULT: 'Defaulted',
      NOT_YET_VALIDATED: 'Not yet validated'
    };
    return map[status] || status.replace('_', ' ').toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  }
  
}