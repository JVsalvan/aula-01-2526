'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Link from "next/link";

import Usuarioform from "../../componets/UsuarioForm";
import { Usuario } from "@/app/types/usuarios";
import { buscarUsuarioPorId } from "@/app/services/usuarioService";

export default function EditarUsuario() {

    const params = useParams();
    const router = useRouter();

    const codigo = Number(params.codigo);

    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {

        buscarDados();

    }, []);

    const buscarDados = async () => {

    try {

        const response = await buscarUsuarioPorId(codigo);

        if (response) {

            setUsuario(response);

        } else {

            router.push("/usuarios");
        }

    } catch (error) {

        console.error("Erro ao buscar usuário:", error);

        router.push("/usuarios");
    }
}

    if (!usuario) {

        return (
            <div className="p-8">
                Carregando dados...
            </div>
        );
    }

    return (

        <div>

            <div>

                <Link href="/usuarios">
                    Voltar
                </Link>

                <h1>
                    Editar Usuario #{codigo}
                </h1>

            </div>

            <Usuarioform usuariosExistente={usuario} />

        </div>
    );
}