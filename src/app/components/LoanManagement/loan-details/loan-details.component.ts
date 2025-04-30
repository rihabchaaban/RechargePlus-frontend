import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from 'src/app/core/services/LoanManagement/loan.service';
import { Loan } from 'src/app/core/entities/LoanManagement/loan'; // adapte selon ton fichier
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Loan_Status } from 'src/app/core/entities/LoanManagement/loan';
import { Repayment_Status } from 'src/app/core/entities/LoanManagement/repayment';


@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit {

  loan!: Loan;
  pdfUrl: SafeResourceUrl | null = null;

    LoanStatus = Loan_Status;
    RepaymentStatus = Repayment_Status;
  

  constructor(
    private route: ActivatedRoute,
    private loanService: LoanService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loanService.getLoanDetails(id).subscribe({
      next: (data) => {
        this.loan = data;
  
        // Affichage direct dans l’iframe depuis la méthode "generateLoanPdf"
        this.loanService.getLoanPdf(id).subscribe((pdfBlob) => {
          const url = URL.createObjectURL(pdfBlob);
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        });
      },
      error: (err) => {
        console.error('Error fetching loan details:', err);
      }
    });
  }
  
  downloadPdf(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loanService.downloadLoanPdf(id).subscribe((pdfBlob) => {
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Loan_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
  
  
  

  formatStatus(status: string): string {
    const formatted = status.replace(/_/g, ' ').toLowerCase();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  getPdfUrl(base64: string): any {
    const blob = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + base64);
    return blob;
  }

  contractVisible = false;

scrollToContract(): void {
  this.contractVisible = true;
  const el = document.getElementById('loan-contract');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

  
}
