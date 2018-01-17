import { Component, OnInit } from '@angular/core';
import { Bd } from '../../bd.service'

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  constructor(private bd: Bd) { }

  ngOnInit() {
   
  }


} 
