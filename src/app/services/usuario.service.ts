import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersUrl: string = 'http://localhost:8080/usuarios';

  constructor(private httpClient: HttpClient) {}

  getUser(id: number): Observable<User> {
    const url: string = `${this.usersUrl}/${id}`;
    return this.httpClient.get<User>(url);
  }

  getUserByEmail(email: string): Observable<User> {
    const url: string = `${this.usersUrl}/email/${email}`;
    return this.httpClient.get<User>(url);
  }

  postUser(user: User): Observable<User> {
    const url: string = `${this.usersUrl}/`;
    return this.httpClient.post<User>(url, user);
  }
}
