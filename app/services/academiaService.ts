import { Academia } from "../types/academia";
import api from "./api";


export async function buscarTodos(): Promise<Academia[]> {

    const response = await api.get<Academia[]>('/academia');

    if (response.status === 200) {
        return response.data;
    }

    return [];

}

export async function alterarAcademia(academia: Academia, id: number): Promise<number> {


    var dadosResult = await api.put<number>(`/academia/${id}`, academia);
    return dadosResult.data;


}

export async function salvarAcademia(academia: Academia): Promise<number> {


    var dadosResult = await api.post<number>(`/academia`, academia);
    return dadosResult.data;


}
