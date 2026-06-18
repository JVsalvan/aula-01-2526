
'use client'

import { Aluno } from "../types/alunos";
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
): Promise<Aluno | null> {

    const dados = await api.get<Aluno>(
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

    const dadosResult = await api.post<number>(
        `/alunos`,
        aluno
    );

    return dadosResult.data;
}

export async function alterarAluno(
    aluno: Aluno,
    id: number
): Promise<number> {

    const dadosResult = await api.put<number>(
        `/alunos/${id}`,
        aluno
    );

    return dadosResult.data;
}

