
'use client'

import { Aluno, AlunoDetalhes, AlunoRequest } from "../types/alunos";
import api from "./api";

export async function buscarListaAlunos(): Promise<Aluno[]> {
    const dados = await api.get<Aluno[]>('/alunos');
    if (dados.status === 200) {
        return dados.data;
    }
    return [];
}

export async function alterarStatusAluno(
    aluno: Aluno
): Promise<void> {

    let novoStatus = {};

    if (aluno.status === "ATIVO") {

        novoStatus = {
            status: "INATIVO"
        };

    } else {

        novoStatus = {
            status: "ATIVO"
        };
    }

    const dadosResult = await api.put<number>(
        `/alunos/${aluno.id}/AlterarStatus`,
        novoStatus
    );

    if (dadosResult.status !== 200) {

        alert("Erro ao atualizar status");
    }
}

export async function buscarAlunoPorId(
    id: number
): Promise<AlunoDetalhes | null> {

    const dados = await api.get<AlunoDetalhes>(
        `/alunos/${id}`
    );

    if (dados.status === 200) {

        return dados.data;
    }

    return null;
}

export async function salvarAluno(
    aluno: Aluno
): Promise<number> {
    const request: AlunoRequest = {
        id: 0,
        nome: aluno.nome,
        telefone: aluno.telefone,
        cpf: aluno.cpf,
        dataNascimento: aluno.dataNascimento,
        planoId: aluno.planoId || 0
    };

    const dadosResult = await api.post<number>(
        `/alunos`,
        request
    );

    return dadosResult.data;
}

export async function alterarAluno(
    aluno: Aluno,
    id: number
): Promise<number> {
    const request: AlunoRequest = {
        id: id,
        nome: aluno.nome,
        telefone: aluno.telefone,
        cpf: aluno.cpf,
        dataNascimento: aluno.dataNascimento,
        planoId: aluno.planoId || 0
    };

    const dadosResult = await api.put<number>(
        `/alunos/${id}`,
        request
    );

    return dadosResult.data;
}

export async function renovarPlanoAluno(id: number): Promise<void> {
    const response = await api.put(`/alunos/${id}/renovar`);
    if (response.status !== 200) {
        throw new Error("Erro ao renovar plano");
    }
}

export async function cancelarPlanoAluno(id: number): Promise<void> {
    const response = await api.put(`/alunos/${id}/cancelar-plano`);
    if (response.status !== 200) {
        throw new Error("Erro ao cancelar plano");
    }
}

export async function trocarPlanoAluno(id: number, novoPlanoId: number): Promise<void> {
    const response = await api.put(`/alunos/${id}/trocar-plano`, { novoPlanoId });
    if (response.status !== 200) {
        throw new Error("Erro ao trocar plano");
    }
}

