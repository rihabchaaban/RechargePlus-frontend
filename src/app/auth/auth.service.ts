import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient, private router: Router) {}

  signin(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/signin`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  signup(data: any) {
    return this.http.post(`${this.apiUrl}/auth/signup`, data, { responseType: 'text' });
  }
  

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.role;
    } catch {
      return null;
    }
  }

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      return decoded.idUser || decoded.id || null;
    } catch (e) {
      return null;
    }
  }
  

  resetPassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/auth/reset-password/${token}`, {
      newPassword
    });
  }

  changePassword(data: any) {
    return this.http.post('http://localhost:8082/api/auth/change-password', data, {
      responseType: 'text' // 👈 pour bien recevoir le message texte
    });
  }
  
  
  
  
}
