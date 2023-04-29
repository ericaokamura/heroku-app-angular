import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {}

  public getUserById(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.handleRequest(this.http.get<User>(url, this.httpOptions));
  }

  public getUserByEmail(email: string): Observable<User> {
    const url = `${this.apiUrl}/email/${email}`;
    return this.handleRequest(this.http.get<User>(url, this.httpOptions));
  }

  public postUser(user: User): Observable<User> {
    return this.handleRequest(this.http.post<User>(this.apiUrl, user, this.httpOptions));
  }

  public updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.handleRequest(this.http.put<User>(url, user, this.httpOptions));
  }

  public deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.handleRequest(this.http.delete(url, this.httpOptions));
  }

  public getAllUsers(): Observable<User[]> {
    return this.handleRequest(this.http.get<User[]>(this.apiUrl, this.httpOptions));
  }

  public createUser(user: User): Observable<User> {
    return this.handleRequest(this.http.post<User>(this.apiUrl, user, this.httpOptions));
  }

  public updateUserById(id: number, user: User): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.handleRequest(this.http.put<User>(url, user, this.httpOptions));
  }

  private handleRequest<T>(request: Observable<T>): Observable<T> {
    return request.pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
