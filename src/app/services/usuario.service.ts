import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Usuario {
  nomeCompleto: string;
  login: string;
  senha: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuariosUrl = 'http://localhost:8080/usuarios';

  constructor(private httpClient: HttpClient) {}

  getUsuario(id: number): Observable<Usuario> {
    const url = `${this.usuariosUrl}/${id}`;
    return this.httpClient.get<Usuario>(url);
  }

  getUsuarioByEmail(email: string): Observable<Usuario> {
    const url = `${this.usuariosUrl}/email/${email}`;
    return this.httpClient.get<Usuario>(url);
  }

  postUsuario(usuario: Usuario): Observable<Usuario> {
    const url = `${this.usuariosUrl}/`;
    return this.httpClient.post<Usuario>(url, usuario);
  }
}
