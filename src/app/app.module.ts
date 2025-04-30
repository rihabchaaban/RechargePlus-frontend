import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { LoanHomeComponent } from './components/LoanManagement/loan-home/loan-home.component';
import { LoansListComponent } from './components/LoanManagement/loans-list/loans-list.component';
import { CreateLoanComponent } from './components/LoanManagement/create-loan/create-loan.component';
import { LoanDetailsComponent } from './components/LoanManagement/loan-details/loan-details.component';

import { FormsModule } from '@angular/forms';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminLoansComponent } from './components/LoanManagement/admin-loans/admin-loans.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoanHomeComponent,
    LoansListComponent,
    CreateLoanComponent,
    LoanDetailsComponent,
    AdminHomeComponent,
    AdminHeaderComponent,
    AdminLoansComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

