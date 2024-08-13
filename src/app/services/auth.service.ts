import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://interview.t-alpha.com.br/api/auth';

  constructor(private http: HttpClient) { }

  login(data: { taxNumber: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(data: { name: string, taxNumber: string, mail: string, phone: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

saveToken(token: string) {
  localStorage.setItem('auth_token', token);
}

getToken(): string {
  return localStorage.getItem('auth_token') || '';
}
}
