import { Component } from '@angular/core';
import { Loan } from 'src/app/core/entities/LoanManagement/loan';
import { LoanService } from 'src/app/core/services/LoanManagement/loan.service';

@Component({
  selector: 'app-loan-home',
  templateUrl: './loan-home.component.html',
  styleUrls: ['./loan-home.component.css']
})
export class LoanHomeComponent {
  loanDecisionMessage: string | null = null;

constructor(private loanService: LoanService) {}

ngOnInit() {
  const userAccountId = 4; // À remplacer dynamiquement si besoin
  this.loanService.getLoanDecision(userAccountId).subscribe({
    next: (decision) => {
      this.loanDecisionMessage = decision;
    },
    error: (err) => {
      console.error('Erreur lors de la récupération de la décision de prêt', err);
    }
  });
}


}
