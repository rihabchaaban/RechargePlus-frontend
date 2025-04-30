import { Component } from '@angular/core';
import { LoanService } from 'src/app/core/services/LoanManagement/loan.service';
import { OnInit } from '@angular/core';
import { Loan } from 'src/app/core/entities/LoanManagement/loan';


@Component({
  selector: 'app-admin-loans',
  templateUrl: './admin-loans.component.html',
  styleUrls: ['./admin-loans.component.css']
})
export class AdminLoansComponent implements OnInit {

  loans: Loan[] = [];
  filteredLoans: Loan[] = [];
statusFilter: string = '';
guarantorFilter: string = '';


  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getLoans().subscribe({
      next: (data) => {
        this.loans = data;
        this.filteredLoans = [...this.loans]; // copie initiale
        console.log("Loans loaded:", this.loans);
      },
      error: (err) => {
        console.error('Error loading loans:', err);
      }
    });
  }
  applyFilters() {
    this.filteredLoans = this.loans.filter(loan => {
      const matchesStatus = this.statusFilter === '' || loan.status === this.statusFilter;
      const matchesGuarantor =
        this.guarantorFilter === '' || (loan.guarantor && loan.guarantor.fullName?.toLowerCase().includes(this.guarantorFilter.toLowerCase()));
      return matchesStatus && matchesGuarantor;
    });
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
  sortColumn: string = '';
sortDirection: 'asc' | 'desc' = 'asc';

sortBy(column: 'request_date' | 'amount' | 'interestRate' | 'total_repayment_amount' | 'remaining_repayment'| 'duration') {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }

  this.filteredLoans.sort((a, b) => {
    let aValue: number;
    let bValue: number;

    if (column === 'request_date') {
      aValue = new Date(a.request_date).getTime();
      bValue = new Date(b.request_date).getTime();
    } else {
      aValue = a[column] as number;
      bValue = b[column] as number;
    }

    return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });
}


}
