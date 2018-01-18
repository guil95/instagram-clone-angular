import { Component, OnInit } from '@angular/core';
import { Bd } from '../../bd.service'
import * as firebase from 'firebase'
import { Publicacao } from '../../shared/publicacao.model';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public publicacoes: any
  public email: string

  constructor(private bd: Bd) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
      
      this.atualizarTimeLine()
    })

   
  }

  public atualizarTimeLine(): void{
    this.bd.consultaPublicacoes(this.email)
      .then((publicacoes: any) => {
        this.publicacoes = publicacoes
        console.log(publicacoes)
      })
  }

} 
