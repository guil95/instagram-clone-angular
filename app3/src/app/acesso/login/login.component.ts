import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'

import { Auth } from '../../auth.service'
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()
  public errorMessageLogin: string = ''
  constructor(private auth: Auth) { }

  ngOnInit() {
  }

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  public exibirPainelCadastro(): void{
    this.exibirPainel.emit('cadastro')
  }

  public autenticar(): void{
    if(this.formulario.status === 'INVALID'){
      this.errorMessageLogin = 'Prencha os campos corretamente para efetuar login corretamente (Senha deve ter no mínimo 6 dígitos e email deve ser válido)'
    }else if(this.formulario.controls.email.status  === 'INVALID'){
      this.errorMessageLogin = 'Prencha o campo email'
    }else if(this.formulario.controls.senha.status  === 'INVALID'){
      this.errorMessageLogin = 'Prencha o campo senha'
    }else{
      this.auth.autenticar(this.formulario.value).catch((err) => {
        console.log(err.code)
        switch(err.code){
          case 'auth/invalid-email':
            this.errorMessageLogin = 'Endereço de email inválido'
            break;
          case 'auth/user-not-found':
            this.errorMessageLogin = 'Usuário não existe'
            break;
        }
      })
    }


  }

}
