import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    password: '',
    mobile_number: '',  
    address: '',        
    birth_date: '',     
    country: ''         
  };
  

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    this.authService.signup(this.user).subscribe({
      next: () => {
        this.router.navigate(['/signin']); // ✅ redirection après succès
      },
      error: (err) => {
        if (err.status === 400 && err.error.includes('Email déjà utilisé')) {
          this.errorMessage = '❌ Cet email est déjà utilisé.';
        } else {
          this.errorMessage = '❌ Erreur lors de l’inscription.';
        }
      }
    });
  }

  
}
