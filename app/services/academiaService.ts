import { Academia } from "../types/academia";
import api from "./api";


export async function buscarTodos(): Promise<Academia[]> {

       const response = await api.get<Academia[]>('/academia');

      if (response.status === 200) {
        return response.data;
      }

      return [];
    
}