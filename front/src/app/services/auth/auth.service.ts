import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000';

  getTasks(id: string) {
    return this.http.get(`${this.url}/tasks/${id}`);
  }

  postTask(task: any) {
    return this.http.post(`${this.url}/tasks`, task);
  }

  editTask(task: any) {
    return this.http.put(`${this.url}/tasks/${task.id}`, task);
  }

  deleteTask(task: any) {
    return this.http.delete(`${this.url}/tasks/${task.id}`);
  }
}