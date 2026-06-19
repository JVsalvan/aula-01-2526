import { Academia } from "../types/academia";
import api from "./api";

export async function buscarTodos(): Promise<Academia[]> {

    const dados = await api.get<Academia[]>('/academia');

    if (dados.status === 200) {
        return dados.data;
    }

    return [];
}


export async function alterarAcademia(
    academia: Academia,
    id: number
): Promise<number> {

    const dadosResult = await api.put<number>(
        `/academia/${id}`,
        academia
    );

    return dadosResult.data;
}

export async function buscarAcademiaPorId(
    id: number
): Promise<Academia | null> {

    const dados = await api.get<Academia>(
        `/academia/${id}`
    );

    if (dados.status === 200) {

        return dados.data;
    }

    return null;
}

export async function salvarAcademia(
    academia: Academia
): Promise<number> {

    const dadosResult = await api.post<number>(
        `/academia`,
        academia
    );

    return dadosResult.data;
}

export async function alterarStatusAcademia(
    academia: Academia
): Promise<void> {

    let novoStatus = {};

    if (academia.status === "ATIVO") {

        novoStatus = {
            status: "INATIVO"
        };

    } else {

        novoStatus = {
            status: "ATIVO"
        };
    }

    const dadosResult = await api.put<number>(
        `/academia/${academia.id}/AlterarStatus`,
        { status: novoStatus }
    );

    if (dadosResult.status !== 200) {

        alert("Erro ao atualizar Status!");
    }

    
}