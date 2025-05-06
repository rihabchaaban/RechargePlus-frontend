import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']


})
export class ResetPasswordComponent {
  newPassword = '';
  token = '';
  message = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  onReset() {
    this.http.post(`http://localhost:8082/api/auth/reset-password?token=${this.token}`, {
      newPassword: this.newPassword
    }, { responseType: 'text' }).subscribe({
      next: (res) => {
        console.log('✅ Réponse du backend :', res); // pour test
        this.message = 'Mot de passe mis à jour ✅';
        setTimeout(() => this.router.navigate(['/signin']), 2000);
      },
      error: (err) => {
        console.error('❌ Erreur reçue :', err);
        this.message = 'Erreur lors de la réinitialisation';
      }
    });
  }
  
}
