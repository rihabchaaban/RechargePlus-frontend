import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { jwtDecode } from 'jwt-decode';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.signin({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
  
        const decoded: any = jwtDecode(res.token);
        const role = decoded.role;
  
        if (role === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        } else if (role === 'CLIENT') {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Rôle non reconnu.';
        }
      },
      error: () => {
        this.errorMessage = 'Identifiants invalides.';
      }
    });
  }
  
}
