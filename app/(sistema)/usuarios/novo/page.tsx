
"use client"
import Link from "next/link";
import UsuarioForm from "../componets/UsuarioForm";


export default function cadastrarUsuarios() {

    return (
        <div>
            <div>
                <Link href="/usuarios">Voltar</Link>
                <h1>Cadastro de novo usuario</h1>
            </div>
            <UsuarioForm/>
        </div>
    );
}