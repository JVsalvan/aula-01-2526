
export class Aluno {

    constructor(
        public id: number | null,
        public nome: string,
        public cpf: string,
        public telefone: string,
        public dataNascimento: string,
        public status: string,
        public planoId?: number
    ) { }

}

export interface AlunoFormProps {
    alunoExistente?: Aluno;
}

export interface AlunoRequest {
    id: number,
    nome: string,
    telefone: string,
    cpf: string,
    dataNascimento: string | Date,
    planoId: number
}

export interface Exercicio {
    id: number;
    nome: string;
    series: string;
    repeticoes: string;
    descanso: string;
}

export interface ExercicioRequest {
    nome: string;
    series: string;
    repeticoes: string;
    descanso: string;
}

export interface FichaTreino {
    id: number;
    objetivo: string;
    exercicios: Exercicio[];
}

export interface FichaTreinoRequest {
    alunoId: number;
    objetivo: string;
    exercicios: ExercicioRequest[];
}

export interface Plano {
    id: number;
    descricao: string;
    valor: number;
    diasValidade: number;
    ativo?: boolean;
}

export interface PlanoRequest {
    descricao: string;
    valor: number;
    duracao: number;
}

export interface AlunoPlano {
    plano: Plano;
    dataAdesao: string;
    dataExpiracao: string;
    status: string;
    proximoVencimento: boolean;
}

export interface AlunoDetalhes extends Aluno {
    plano: AlunoPlano | null;
    fichasTreino: FichaTreino[];
}

