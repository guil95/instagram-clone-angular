import { Injectable } from '@angular/core'
import {Router} from '@angular/router'
import { Usuario } from './shared/usuario.model'
import * as firebase from 'firebase'

@Injectable()
export class Auth{
    public token_id: string

    constructor(private router: Router){}

    public cadastrarUsuario(usuario: Usuario): Promise<any>{

       return firebase.auth().createUserWithEmailAndPassword(
           usuario.email, 
           usuario.senha
        )
        .then((resposta: any)=>{
            firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                .set( usuario )
        })
        .catch((error: Error) => {
            console.log(error)
        })


    }

    public autenticar(usuario):void{
        console.log(usuario)
        firebase.auth().signInWithEmailAndPassword(
            usuario.email, 
            usuario.senha
        )
        .then((resposta) => {
            firebase.auth().currentUser.getIdToken()
                .then((token) => {
                    this.token_id = token
                    localStorage.setItem('token', token)
                    this.router.navigate(['/home'])
                })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    public autenticado() : boolean {
        //fazer uma requisição para o backend para verificar algo (select no banco para buscar usuário)
        if(this.token_id === undefined  && localStorage.getItem('token') != null){
            
            this.token_id = localStorage.getItem('token') 
        }

        if(this.token_id === undefined){
            this.router.navigate(['/']);
        }

       return  this.token_id !== undefined     
    }

    public sair(): void{
        firebase.auth().signOut()
            .then(() => {
                localStorage.clear()
                this.token_id = undefined
                this.router.navigate(['/'])
            })
        
    }
}