import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/usuarios';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {}

  public getUserById(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url, this.httpOptions);
  }

  public getUserByEmail(email: string): Observable<User> {
    const url = `${this.apiUrl}/email/${email}`;
    return this.http.get<User>(url, this.httpOptions);
  }

  public postUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, this.httpOptions);
  }

  public updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<User>(url, user, this.httpOptions);
  }

  public deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, this.httpOptions);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user, this.httpOptions);
  }

  public updateUserById(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, this.httpOptions);
  }
}
