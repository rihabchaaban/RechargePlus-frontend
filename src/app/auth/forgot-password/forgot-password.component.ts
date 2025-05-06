import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']

})
export class ForgotPasswordComponent {
  email = '';
  message = '';
  error = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post<{success: boolean, message: string}>(
      'http://localhost:8082/api/auth/forgot-password', 
      { email: this.email },
      { 
        headers: { 'Content-Type': 'application/json' },
        observe: 'response' // Get full HttpResponse
      }
    ).subscribe({
      next: (response) => {
        const body = response.body;
        if (body && !body.success) {
          // Handle business logic failure (success=false but HTTP 200)
          this.error = body.message || "Erreur lors de l''envoi de l''email.";
          this.message = '';
        } else {
          this.message = body?.message || 'Email envoyé avec succès';
          this.error = '';
        }
      },
      error: (error) => {
        // Handle HTTP errors (4xx, 5xx)
        if (error.status === 404) {
          this.error = 'Email non trouvé';
        } else if (error.status === 400) {
          this.error = 'Email requis';
        } else {
          this.error = 'Erreur serveur: ' + (error.error?.message || error.message);
        }
        this.message = '';
      }
    });
  }
}
