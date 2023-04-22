import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuarioService: UsuarioService;
  formData: FormGroup;
  
  constructor(usuarioService: UsuarioService, private fb: FormBuilder) {
    this.usuarioService = usuarioService;
    this.formData = new FormGroup({ 
      email: new FormControl(),
      password: new FormControl()
    }); 
  }

  login(dadosLogin: any): void {
    const email: string = dadosLogin.email;
    console.log(email);
    const password: string = dadosLogin.password;
    console.log(password);
    let passwordUsuario: string = "";
    setTimeout(() => 
    {
      this.usuarioService.getUsuarioByEmail(email).subscribe((usuario: Usuario) => {
        console.log(usuario);
        passwordUsuario = usuario.senha;
        console.log(passwordUsuario);
        if(password === passwordUsuario) {
          console.log("Usuário autenticado!");
        } else {
          console.log("Usuário não existe ou senha incorreta.");
        }
      });
    },
    3000);
  }
}
