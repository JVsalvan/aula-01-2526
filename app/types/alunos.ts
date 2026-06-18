
export class Aluno {

    constructor(
        public id: number | null,
        public nome: string,
        public cpf: string,
        public telefone: string,
        public email: string,
        public status: string
    ) { }

}

export interface AlunoFormProps {
    alunoExistente?: Aluno
}

