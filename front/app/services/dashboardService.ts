import api from "./api";

export interface AlunoProximoVencimento {
    id: number;
    nome: string;
    dataExpiracao: string;
    diasRestantes: number;
}

export interface DashboardData {
    totalAlunos: number;
    alunosPlanosAVencer: number;
    alunosPlanosCancelados: number;
    alunosProximosVencimento: AlunoProximoVencimento[];
}

const dashboardService = {
    getDashboard: async () => {
        const response = await api.get<DashboardData>("/dashboard");
        return response.data;
    }
};

export default dashboardService;
