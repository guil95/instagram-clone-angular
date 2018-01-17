import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { Bd } from '../../bd.service'
import * as firebase from 'firebase'
import {Progresso} from '../../progresso.service'
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public imagem: any
  public email: string
  
  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number
  public total: number
  public totalTransferido: number

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar(): void{
    const imagem  = this.imagem != undefined ? this.imagem[0] : null
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: imagem
    })

    let acompanhamentoUpload = Observable.interval(1500)

    let next = new Subject()

    next.next(true)

    acompanhamentoUpload
      .takeUntil(next)
      .subscribe(() => {
        console.log(this.progresso.status)
        console.log(this.progresso.estado)

        this.total = this.progresso.estado.totalBytes
        this.totalTransferido = this.progresso.estado.bytesTransferred

        this.porcentagemUpload = Math.round((this.totalTransferido * 100) /  this.total)  
   

        this.progressoPublicacao = 'andamento'
        
        if(this.progresso.status === 'concluido'){
          this.progressoPublicacao = 'concluido'
          next.next(false)
        }
      })

  }

  public preparaImagemUpload (evento: Event): void{
    this.imagem = (<HTMLInputElement>event.target).files

  }

}
