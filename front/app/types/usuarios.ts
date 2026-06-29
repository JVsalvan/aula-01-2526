
export class Usuario {
    constructor(
        public id: number|null,
        public name: string,
        public email: string,
        public status: string

    ) { }
}

export interface UsuarioRequest {
    id: number,
    nome: string,
    email: string,
    senha: string,
    cref: string,
    
}


export interface AuthContextType {
    usuario: Usuario |null,
    token:string| null,
    login: (Usuario: Usuario, token: string) => void,

    logout: () => void


}

 export interface UsuarioFormProps{
    usuariosExistente?: UsuarioRequest
}

export interface UsuarioLogado {
    nome: string,
    role: string
}
