
export class Usuario {
    constructor(
        public id: number|null,
        public name: string,
        public email: string,
        public status: string

    ) { }
}


export interface AuthcontextType {
    usuario: Usuario |null,
    token:string| null,
    login: (Usuario: Usuario, token: string) => void,

    logout: () => void


}

 export interface UsuarioFormProps{
    usuariosExistente?: Usuario
}
