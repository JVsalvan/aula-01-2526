import { Usuario } from "../context/AuthContext";

export class UsuarioMock {

    private static usuarioDB: Usuario[] = [
        new Usuario(1, "Professor joao", "0000",  "ATIVO"),
        new Usuario(2, "Paulo", "0000",  "ATIVO"),
        new Usuario(3, " rafa", "0000",  "ATIVO"),
    ];


    static async ListarTodos(): Promise<Usuario[]> {
        return [...this.usuarioDB]
    }

    static async salvar(usuario: Usuario): Promise<void> {

        const indexExistente = this.usuarioDB.findIndex(u => u.id === usuario.id);

        if (indexExistente === -1) {


            const novoCodigo = Math.max(...this.usuarioDB.map(u => u.id??0)) + 1;
            usuario.id = novoCodigo;
            this.usuarioDB.push(usuario);
            console.log(`Usuario Id ${novoCodigo} Salvo com sucesso`);
        }else {
            this.usuarioDB[indexExistente].name = usuario.name;
            this.usuarioDB[indexExistente].email = usuario.email;

           console.log(`Usuario Id ${usuario.id} Atualizado com sucesso`);

        }

    }

    // Dentro da class UsuarioMock...

static async alterarStatus(codigo: number): Promise<void> {
    const usuario = this.usuarioDB.find(u => u.id === codigo);
    if (usuario) {
        usuario.status = usuario.status; // sInverte o booleano
        console.log(`Status do Professor ID ${codigo} alterado para: ${usuario.id}`);
    } else {
        throw new Error("Professor não encontrado");
    }
}

    static async buscarPorId(codigo: Number): Promise<Usuario | undefined> {

        return this.usuarioDB.find(u => u.id === codigo);
    }

}
