import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loan } from '../../entities/LoanManagement/loan';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  apiUrl = "http://localhost:8082/RechargePlus/loan"
  constructor(private http: HttpClient) { }
  createLoanBeforeApproval(
    accountId: number,
    requestedAmount: number,
    requestedDuration: number,
    repaymentType: string,
    guarantor: any,
    incomeProof?: File,
    commitmentLetter?: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('guarantor', JSON.stringify(guarantor));

    if (incomeProof) {
      formData.append('incomeProof', incomeProof);
    }
    if (commitmentLetter) {
      formData.append('commitmentLetter', commitmentLetter);
    }

    return this.http.post(
      `${this.apiUrl}/createLoanBeforeApprouvement/${accountId}/${requestedAmount}/${requestedDuration}/${repaymentType}`,
      formData
    );
  }
  


  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/getloans`);
   /* return this.http.get<Loan[]>(`${this.apiUrl}//getLoansByIdAccount/`);*/
   
  }
  getLoanDetails(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/get/${id}`);
  }
  
  getLoanPdf(loanId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${loanId}/ContratPdf`, {
      responseType: 'blob'
    });
  }
  
  downloadLoanPdf(loanId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/loans/${loanId}/downloadContrat`, {
      responseType: 'blob'
    });
  }
  getLoanDecision(accountId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/getDecision/${accountId}`, {
      responseType: 'text'
    });
  }
  getLoanSchedule(accountId: number, amount: number, duration: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/loanSchedule/${accountId}/${amount}/${duration}`);
  }
  
}

 

 

  

