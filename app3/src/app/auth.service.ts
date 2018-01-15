import { Usuario } from './shared/usuario.model'

export class Auth{
    public cadastrarUsuario(usuario: Usuario): void{
        console.log('Chegamos até o serviço: ', usuario)
    }
}