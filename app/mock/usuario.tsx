import { Usuario } from "../context/AuthContext";

export class UsuarioMock {

    private static usuarioDB: Usuario[] = [
        new Usuario(1, "Professor joao", "0000", true),
        new Usuario(2, "Paulo", "0000", true),
        new Usuario(3, " rafa", "0000", true),
    ];


    static async ListarTodos(): Promise<Usuario[]> {
        return [...this.usuarioDB]
    }

    static async salvar(usuario: Usuario): Promise<void> {

        const indexExistente = this.usuarioDB.findIndex(u => u.codigo === usuario.codigo);

        if (indexExistente === -1) {


            const novoCodigo = Math.max(...this.usuarioDB.map(u => u.codigo)) + 1;
            usuario.codigo = novoCodigo;
            this.usuarioDB.push(usuario);
            console.log(`Usuario Id ${novoCodigo} Salvo com sucesso`);
        }else {
            this.usuarioDB[indexExistente].name = usuario.name;
            this.usuarioDB[indexExistente].cpf = usuario.cpf;

           console.log(`Usuario Id ${usuario.codigo} Atualizado com sucesso`);

        }

    }

    static async buscarPorId(codigo: Number): Promise<Usuario | undefined> {

        return this.usuarioDB.find(u => u.codigo === codigo);
    }

}
