import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuariosUrl: string = 'http://localhost:8080/usuarios';

  constructor(private httpClient: HttpClient) {}

  getUsuario(id: number): Observable<User> {
    const url: string = `${this.usuariosUrl}/${id}`;
    return this.httpClient.get<User>(url);
  }

  getUsuarioByEmail(email: string): Observable<User> {
    const url: string = `${this.usuariosUrl}/email/${email}`;
    return this.httpClient.get<User>(url);
  }

  postUsuario(usuario: User): Observable<User> {
    const url: string = `${this.usuariosUrl}/`;
    return this.httpClient.post<User>(url, usuario);
  }
}
