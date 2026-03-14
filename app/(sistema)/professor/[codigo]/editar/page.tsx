"use client"
import { Usuario as Professor } from "@/app/context/AuthContext";
import { UsuarioMock as ProfessorMock } from "@/app/mock/usuario";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfessorForm from "../../componets/ProfessorForm";
import Link from "next/link";

export default function EditarProfessor() {
    const { codigo } = useParams();
    const router = useRouter();
    const [professor, setProfessor] = useState<Professor | null>(null);

    useEffect(() => {
        const buscar = async () => {
            const data = await ProfessorMock.buscarPorId(Number(codigo));
            data ? setProfessor(data) : router.push("/usuarios");
        };
        buscar();
    }, [codigo]);

    if (!professor) return <div className="p-20 text-center animate-pulse text-orange-500 font-black uppercase text-xs tracking-[0.5em]">Carregando Perfil...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <header className="border-b border-neutral-800 pb-8 text-right">
                <Link href="/usuarios" className="text-[10px] font-black text-neutral-600 hover:text-orange-500 uppercase tracking-widest mb-6 block text-left w-fit">← Cancelar</Link>
                <h1 className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2 text-left">Update Profile</h1>
                <h2 className="text-4xl font-light text-white italic text-left">Editando: <span className="font-bold text-orange-500">{professor.name}</span></h2>
            </header>
            <ProfessorForm professorExistente={professor} />
        </div>
    );
}