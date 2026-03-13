import { Usuario } from "../context/AuthContext";

export class UsuarioMock {

    private static  usuarioDB: Usuario[] = [
        new Usuario (1, "Professor joao","0000",true),
         new Usuario (2, "Paulo","0000",true),
          new Usuario (3, " rafa","0000",true),
    ];


    static async ListarTodos(): Promise<Usuario[]>{
        return[...this.usuarioDB]
    }

}
