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

  constructor(private _loanService: LoanService) {
    this._loanService.getLoans().subscribe({
      next: (data) => {
        this.loans = data;
        console.log('Fetched loans:', this.loans); // Move the log here
      },
      error: (err) => {
        console.error('Error fetching loans:', err);
      }
    });
  }

}
