import { promises } from "dns";
import { Usuario } from "../types/usuarios";
import api from "./api";


export async function  buscarListaUsuarios():  Promise<Usuario[]>{


        const dados = await api.get<Usuario[]>('/usuarios');
      if (dados.status == 200) {
        return dados.data;

      }
    return[];
} 

export async function alterarStatusUsuario(usuario: Usuario): Promise<void>{

      var dadosResult = await api.put<Usuario>('/usuarios/' + usuario.id + '/AlterarStatus' );
  

}