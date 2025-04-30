import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanHomeComponent } from './components/LoanManagement/loan-home/loan-home.component';
import { LoanDetailsComponent } from './components/LoanManagement/loan-details/loan-details.component';
import { HomeComponent } from './components/home/home.component';
import { CreateLoanComponent } from './components/LoanManagement/create-loan/create-loan.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminLoansComponent } from './components/LoanManagement/admin-loans/admin-loans.component';





const routes: Routes = [
  //FrontOffice Home
  {path: '', component:HomeComponent},


  //Loan Management
  {path:'loan', component:LoanHomeComponent},
  {path: 'loanDetail/:id', component: LoanDetailsComponent },
  {path: 'apply', component:CreateLoanComponent},



   // 🛠 Admin
   {//BackOffice Home
    path: 'admin',
    component: AdminHomeComponent,
   //Loan Management BackOffice
    children: [
      { path: 'loans', component: AdminLoansComponent },
 
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
