import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  httpClient: HttpClient;

  usuariosUrl: string = "http://localhost:8080/usuarios";

  constructor(httpClient: HttpClient) {
      this.httpClient = httpClient;
   }

  getUsuario(id: number): Observable<Usuario> {
    const url = this.usuariosUrl + "/" + id;
    return this.httpClient.get<Usuario>(url);
  }

  getUsuarioByEmail(email: string): Observable<Usuario> {
    const url = this.usuariosUrl + "/email/" + email;
    return this.httpClient.get<Usuario>(url);
  }

  postUsuario(usuario: Usuario): Observable<Usuario> {
    const url = `${this.usuariosUrl}/`;
    return this.httpClient.post<Usuario>(url, usuario);
  }
}
