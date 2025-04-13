import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanHomeComponent } from './components/LoanManagement/loan-home/loan-home.component';
import { HomeComponent } from './components/home/home.component';
import { CreateLoanComponent } from './components/LoanManagement/create-loan/create-loan.component';

const routes: Routes = [

  {path:'loan', component:LoanHomeComponent},
  {path: 'loan/apply', component:CreateLoanComponent},
  {path: '', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
