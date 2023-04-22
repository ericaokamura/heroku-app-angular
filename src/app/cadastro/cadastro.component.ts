import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  usuarioService: UsuarioService;
  formData: FormGroup;
  
  constructor(usuarioService: UsuarioService, private fb: FormBuilder) {
    this.usuarioService = usuarioService;
    this.formData = new FormGroup({ 
      email: new FormControl(),
      password: new FormControl()
    }); 
  }

  cadastrar(dadosCadastro: any) {
    console.log(dadosCadastro);
    const usuario: Usuario = {
      nomeCompleto: dadosCadastro.nome + " " + dadosCadastro.sobrenome,
      email: dadosCadastro.email,
      login: dadosCadastro.email,
      senha: dadosCadastro.password
    };
    this.usuarioService.postUsuario(usuario).subscribe((usr) => {
      console.log(usr);
      if(usr != null) {
        console.log("Usuário cadastrado com sucesso");
      }
    });
  }

}
