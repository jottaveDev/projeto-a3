import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000';

  login(body: any) {
    return this.http.post(`${this.url}/login`, body);
  }

  register(body: any) {
    return this.http.post(`${this.url}/users`, body);
  }
}
