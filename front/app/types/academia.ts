
export class Academia {
    constructor(
        public id: number | null,
        public name: string,
        public email: string,
        public cnpj: string,
        public telefone: string,
        public localizacao: string,
        public endereco: string,
        public status: string
    ) { }
}

export interface AcademiaFormProps {
    academiaExistente?: Academia
}