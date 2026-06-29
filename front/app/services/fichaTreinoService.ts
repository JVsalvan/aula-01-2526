
import api from "./api";
import { FichaTreino, FichaTreinoRequest } from "../types/alunos";

export async function buscarFichasPorAluno(alunoId: number): Promise<FichaTreino[]> {
    const response = await api.get<FichaTreino[]>(`/ficha-treino/aluno/${alunoId}`);
    if (response.status === 200) {
        return response.data;
    }
    return [];
}

export async function salvarFichaTreino(request: FichaTreinoRequest): Promise<number> {
    const response = await api.post<number>('/ficha-treino', request);
    if (response.status === 200) {
        return response.data;
    }
    throw new Error("Erro ao salvar ficha de treino");
}

export async function deletarFichaTreino(id: number): Promise<void> {
    const response = await api.delete(`/ficha-treino/${id}`);
    if (response.status !== 204) {
        throw new Error("Erro ao deletar ficha de treino");
    }
}
