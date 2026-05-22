'use client'

import { Usuario } from "../types/usuarios";
import api from "./api";

export async function buscarListaUsuarios(): Promise<Usuario[]> {

    const dados = await api.get<Usuario[]>('/usuarios');

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

export async function alterarStatusUsuario(usuario: Usuario): Promise<void> {

    let novoStatus = {};

    if (usuario.status === "ATIVO") {
        novoStatus = {
            status: "INATIVO"
        }
    } else {
        novoStatus = {
            status: "ATIVO"
        }
    }

    const dadosResult = await api.put<number>(
        '/usuarios/' + usuario.id + '/AlterarStatus',
        novoStatus
    );

    if (dadosResult.status !== 200) {
        alert("Erro ao atualizar status");
    }
}

export async function buscarUsuarioPorId(
    id: number
): Promise<Usuario | null> {

    const dados = await api.get<Usuario>(
        `/usuarios/${id}`
    );

    if (dados.status === 200) {

        return dados.data;
    }

    return null;
}

export async function salvarUsuario(
    usuario: Usuario
): Promise<number> {

    const dadosResult = await api.post<number>(
        `/usuarios`,
        usuario
    );

    return dadosResult.data;
}

export async function alterarUsuario(
    usuario: Usuario,
    id: number
): Promise<number> {

    const dadosResult = await api.put<number>(
        `/usuarios/${id}`,
        usuario
    );

    return dadosResult.data;
}

export async function alterarStatusUsua(
    usuario: Usuario
): Promise<number> {

    let novoStatus = {};

    if (usuario.status === "ATIVO") {

        novoStatus = {
            status: "INATIVO"
        };

    } else {

        novoStatus = {
            status: "ATIVO"
        };
    }

    const dadosResult = await api.put<number>(
        `/usuarios/${usuario.id}/AlterarStatus`,
        { status: novoStatus }
    );

    return dadosResult.data;
}
export async function  buscarUsuarioLogado() : Promise<Usuario> {
     return (await api.get<Usuario>('http://localhost:8080/usuarios/usuariologado')).data;
}
