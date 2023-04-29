import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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
    return this.http.get<User>(url, this.httpOptions).pipe(
      retry(3), // Tentativas máximas de 3
      catchError(this.handleError) // Trata erros
    );
  }

  public getUserByEmail(email: string): Observable<User> {
    const url = `${this.apiUrl}/email/${email}`;
    return this.http.get<User>(url, this.httpOptions).pipe(retry(3), catchError(this.handleError));
  }

  public postUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, this.httpOptions).pipe(retry(3), catchError(this.handleError));
  }

  public updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<User>(url, user, this.httpOptions).pipe(retry(3), catchError(this.handleError));
  }

  public deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(retry(3), catchError(this.handleError));
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, this.httpOptions).pipe(retry(3), catchError(this.handleError));
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user, this.httpOptions).pipe(retry(3), catchError(this.handleError));
  }

  public updateUserById(id: number, user: User): Observable<User> {
    return this.http
      .put<User>(`${this.apiUrl}/${id}`, user, this.httpOptions)
      .pipe(retry(3), catchError(this.handleError));
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
    return throwError(errorMessage);
  }
}
