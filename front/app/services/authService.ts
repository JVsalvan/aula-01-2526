import axios from "axios";
import { LoginRequest, LoginResponse, TokenResponse } from "../types/auth";
import { UsuarioLogado } from "../types/usuarios";
import api from "./api";

export async function loginService(login: LoginRequest): Promise<LoginResponse> {

        const loginResult = await axios.post<TokenResponse>('http://localhost:8080/auth/login', login);
        if(loginResult.status === 200){
                const token = loginResult.data.token;
                const usuarioLogado = await axios.get<UsuarioLogado>("http://localhost:8080/usuarios/usuariologado", {
                       headers: {
                        Authorization: `Bearer ${token}`
                       }
                })

                if(usuarioLogado.status === 200){
                        return { token, usuario: usuarioLogado.data }
                }
        }
        throw new Error("Erro ao logar!")

}