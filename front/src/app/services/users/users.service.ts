import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  protected url = 'http://localhost:3000';
  protected id = localStorage.getItem('token');

  getUser() {
    return this.http.get(`${this.url}/users/${this.id}`);
  }

  updateUser(body: any) {
    return this.http.put(`${this.url}/users/${this.id}`, body);
  }

  deleteUser() {
    return this.http.delete(`${this.url}/users/${this.id}`);
  }
}
