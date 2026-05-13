'use client'

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react";

import Cookies from "js-cookie";

import { AuthContextType, Usuario } from "../types/usuarios";

const AuthContext =
    createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
    children
}: {
    children: ReactNode
}) {

    const [usuario, setUsuario] =
        useState<Usuario | null>(null);

    const [token, setToken] =
        useState<string | null>(null);

    useEffect(() => {

        const usuarioRecover =
            Cookies.get('usuario');

        const tokenRecover =
            Cookies.get('token');

        if (usuarioRecover && tokenRecover) {

            try {

                setUsuario(
                    JSON.parse(usuarioRecover)
                );

                setToken(tokenRecover);

            } catch (e) {

                console.error(e);

            }
        }

    }, []);

    const login = (
        usuario: Usuario,
        token: string
    ) => {

        setUsuario(usuario);

        setToken(token);

        Cookies.set(
            'usuario',
            JSON.stringify(usuario),
            { expires: 7 }
        );

        Cookies.set(
            'token',
            token,
            { expires: 7 }
        );
    };

    const logout = () => {

        setUsuario(null);

        setToken(null);

        Cookies.remove('usuario');

        Cookies.remove('token');
    };

    return (

        <AuthContext.Provider
            value={{
                usuario,
                token,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>
    );
}

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {

        throw new Error(
            'useAuth deve ser usado dentro do provider!'
        );
    }

    return context;
};