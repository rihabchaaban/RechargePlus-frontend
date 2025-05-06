import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8082/api/users';

  constructor(private http: HttpClient) {}

  getUserById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`); 
  }
  

  getUsers() {
    return this.http.get<any[]>(this.apiUrl); 
  }
  

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addUser(data: any) {
    return this.http.post(this.apiUrl, data); 
  }

 

  updateUser(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data); 
  }

  uploadProfilePhoto(file: File) {
    const formData = new FormData();
    formData.append('photo', file);
  
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.put('http://localhost:8082/api/users/upload-photo', formData, {
      headers,
      responseType: 'text'  // 👈 très important ici
    });
    
  }

  toggleUserStatus(id: number) {
    return this.http.put(`${this.apiUrl}/${id}/toggle-status`, {});
  }
  

  searchUsers(keyword: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }
  
  
  
  
}
