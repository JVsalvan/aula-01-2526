import api from "./api";
import { Plano, PlanoRequest } from "../types/alunos";

export const planoService = {
    listarTodos: async (): Promise<Plano[]> => {
        const response = await api.get<Plano[]>('/planos');
        return response.data;
    },

    salvar: async (plano: PlanoRequest): Promise<Plano> => {
        const response = await api.post<Plano>('/planos', plano);
        return response.data;
    },

    atualizar: async (id: number, plano: PlanoRequest): Promise<void> => {
        await api.put(`/planos/${id}`, plano);
    },

    alterarStatus: async (id: number): Promise<void> => {
        await api.put(`/planos/${id}/status`);
    }
};
