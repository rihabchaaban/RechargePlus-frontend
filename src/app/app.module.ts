import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';



import { LoanHomeComponent } from './components/LoanManagement/loan-home/loan-home.component';
import { LoansListComponent } from './components/LoanManagement/loans-list/loans-list.component';
import { CreateLoanComponent } from './components/LoanManagement/create-loan/create-loan.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { AdminUserListComponent } from './admin/admin-user-list/admin-user-list.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoanHomeComponent,
    LoansListComponent,
    CreateLoanComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    AppComponent,
    NavbarComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    ChatbotComponent,
    UnauthorizedComponent,
    AdminUserListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
