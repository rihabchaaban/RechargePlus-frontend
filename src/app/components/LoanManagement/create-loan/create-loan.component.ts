import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/core/services/LoanManagement/loan.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Guarantor } from 'src/app/core/entities/LoanManagement/guarantor';


@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('400ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CreateLoanComponent implements OnInit {
  incomeProofFile?: File;
  commitmentLetterFile?: File;
  
  incomeProofError: string | null = null;
  commitmentLetterError: string | null = null;

  loanDecisionMessage: string | null = null;
  loanSchedule: any = null;
  loanError: string | null = null;

  requestedAmount: number = 0;
  requestedDuration: number = 0;
  repaymentType: string = 'constant_annuity';

  guarantor: any = {
    fullName: '',
    nationalId: '',
    phoneNumber: '',
    relationship: '',
    monthlyIncome: null,
    email: ''
  };

  private userAccountId: number = 4;

  constructor(private loanService: LoanService, private router: Router) {}

  ngOnInit(): void {
    this.fetchLoanDecision();
  }

  fetchLoanDecision(): void {
    this.loanService.getLoanDecision(this.userAccountId).subscribe({
      next: (decision) => {
        this.loanDecisionMessage = decision;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la décision de prêt', err);
      }
    });
  }

  onIncomeProofSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.incomeProofFile = target.files[0];
      this.incomeProofError = null; // Clear error when file selected
    } else {
      this.incomeProofFile = undefined;
    }
  }

  onCommitmentLetterSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.commitmentLetterFile = target.files[0];
      this.commitmentLetterError = null; // Clear error when file selected
    } else {
      this.commitmentLetterFile = undefined;
    }
  }

  onLoanInputChange() {
    if (this.requestedAmount > 0 && this.requestedDuration > 0) {
      this.loanError = null;
      this.loanService.getLoanSchedule(this.userAccountId, this.requestedAmount, this.requestedDuration)
        .subscribe({
          next: (response) => {
            this.loanSchedule = response;
            this.loanError = null;
          },
          error: (err) => {
            console.error('Erreur lors de la génération du calendrier de remboursement', err);
            if (typeof err.error === 'string') {
              this.loanError = err.error;
            } else if (err.error?.message) {
              this.loanError = err.error.message;
            } else if (err.error?.error) {
              this.loanError = err.error.error;
            } else {
              this.loanError = 'Une erreur inconnue est survenue.';
            }
            this.loanSchedule = null;
          }
        });
    }
  }

  applyLoan(): void {
    // Vérifier si les fichiers sont présents
    let hasError = false;
    if (!this.incomeProofFile) {
      this.incomeProofError = 'Please upload the Income Proof (PDF).';
      hasError = true;
    }
    if (!this.commitmentLetterFile) {
      this.commitmentLetterError = 'Please upload the Commitment Letter (PDF).';
      hasError = true;
    }

    if (hasError) {
      return; // Stop the submission if errors exist
    }

    this.loanService.createLoanBeforeApproval(
      this.userAccountId,
      this.requestedAmount,
      this.requestedDuration,
      this.repaymentType,
      this.guarantor,
      this.incomeProofFile!,
      this.commitmentLetterFile!
    ).subscribe({
      next: (response) => {
        console.log('Loan created successfully!', response);
        Swal.fire({
          icon: 'success',
          title: 'Loan Application Submitted',
          html: `
          <p>Your loan application has been successfully submitted.</p>
          <p>Your guarantor's documents will be reviewed by an administrator.</p>
          <p>You will receive a response within 24 hours.</p>
          <p>Once approved, your loan request will be automatically processed.</p>
          <p><strong>Thank you for your trust!</strong></p>
        `,
          confirmButtonColor: '#3085d6',
        }).then(() => {
          this.router.navigate(['/loan']);
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erreur lors de la création du prêt', error);

        let errorMessage = "An unexpected error occurred. Please try again.";

        if (error.error) {
          if (typeof error.error === 'string') {
            errorMessage = error.error;
          } else if (error.error.message || error.error.error) {
            errorMessage = error.error.message || error.error.error;
          }
        }

        if (errorMessage.toLowerCase().includes('internal server error')) {
          errorMessage = "The guarantor's income must be at least twice the loan's monthly installment. Please select another guarantor.";
        }

        this.loanError = errorMessage;

        Swal.fire({
          icon: 'error',
          title: 'Loan Application Failed',
          text: errorMessage,
          confirmButtonColor: '#d33',
        });
      }
    });
  }
}











  
  
  
  

