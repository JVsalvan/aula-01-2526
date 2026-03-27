import { Usuario as Professor } from "../context/AuthContext";

export class ProfessorMock {

    // Banco de dados em memória (Staff da Academia)
    private static professorDB: Professor[] = [
        new Professor(1, "Professor João", "000.000.000-01", "ATIVO"),
        new Professor(2, "Paulo Silva", "000.000.000-02",  "ATIVO"),
        new Professor(3, "Rafaela Treinadora", "000.000.000-03",  "ATIVO"),
    ];

    // FUNÇÃO: ListarTodos (Mantida idêntica)
    static async ListarTodos(): Promise<Professor[]> {
        return [...this.professorDB];
    }

    // FUNÇÃO: salvar (Mantida idêntica, apenas nomes de variáveis adaptados)
    static async salvar(professor: Professor): Promise<void> {
        const indexExistente = this.professorDB.findIndex(p => p.id === professor.id);

        if (indexExistente === -1) {
            const novoCodigo = Math.max(...this.professorDB.map(p => p.id??0)) + 1;
            professor.id = novoCodigo;
            this.professorDB.push(professor);
            console.log(`Professor Id ${novoCodigo} Salvo com sucesso`);
        } else {
            this.professorDB[indexExistente].name = professor.name;
            this.professorDB[indexExistente].email = professor.email;
            // Dica de Sênior: Adicionei a linha abaixo para garantir que o status não resete no save
            this.professorDB[indexExistente].status = professor.status;

            console.log(`Professor Id ${professor.id} Atualizado com sucesso`);
        }
    }

    // FUNÇÃO: alterarStatus (Mantida idêntica)
    static async alterarStatus(codigo: number): Promise<void> {
        const professor = this.professorDB.find(p => p.id === codigo);
        if (professor) {
            professor.status = professor.status; 
            console.log(`Status do Professor ID ${codigo} alterado para: ${professor.status}`);
        } else {
            throw new Error("Professor não encontrado");
        }
    }

    // FUNÇÃO: buscarPorId (Mantida idêntica)
    static async buscarPorId(codigo: number): Promise<Professor | undefined> {
        return this.professorDB.find(p => p.id === codigo);
    }
}