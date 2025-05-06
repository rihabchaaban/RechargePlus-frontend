import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { HomeComponent } from './components/home/home.component';
import { LoanHomeComponent } from './components/LoanManagement/loan-home/loan-home.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { AdminUserListComponent } from './admin/admin-user-list/admin-user-list.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';





const routes: Routes = [
  { path: '', component: HomeComponent },              // page marketing
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'admin/users', component: AdminUserListComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ADMIN' } },

 
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' },
    children: [
      { path: 'users', component: AdminUserListComponent }
    ]
  },
  
  {
    path: 'home',
    component: LoanHomeComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'CLIENT' }
  },
  { path: '**', redirectTo: '' }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
