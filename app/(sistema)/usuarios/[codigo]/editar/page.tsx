
'use client'

import { UsuarioMock } from "@/app/mock/usuario";
import { useParams, useRouter } from "next/navigation"

import { useEffect, useState } from "react";
import Usuarioform from "../../componets/UsuarioForm";
import Link from "next/link";
import axios from "axios";
import { Usuario } from "@/app/types/usuarios";

export default function EditarUsuario() {
    const params = useParams()
    const router = useRouter()

    const codigo = Number(params.codigo);

    const [usuario,setUsuario] = useState<Usuario|null>(null);

    useEffect(() => {

        buscarDados();

    }, []);

    const buscarDados = async () => {

       const user = await axios.get<Usuario>('http://localhost:8080/usuarios/'+codigo)
       if (user.data) setUsuario(user.data)
        else router.push("/usuarios")


    }

    if(!usuario) return(
        <div className="p-8">Carregando dados...</div>
    )

    return (
       <div>
        <div>
              <Link href="/usuarios">Voltar</Link>
                <h1>Editar Usuario #{codigo}</h1>
        </div>
        <Usuarioform usuariosExistente={usuario}/>
       </div>
    );
}