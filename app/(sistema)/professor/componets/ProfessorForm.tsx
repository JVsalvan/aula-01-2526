"use client"
import { Usuario as Professor } from "@/app/context/AuthContext";
import { UsuarioMock as ProfessorMock } from "@/app/mock/usuario";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfessorForm({ professorExistente }: { professorExistente?: Professor }) {
    const router = useRouter();
    const [prof, setProf] = useState(professorExistente || new Professor(0, '', '', true));

    const handlerSalvar = async () => {
        await ProfessorMock.salvar(prof);
        router.push("/usuarios");
        router.refresh();
    };

    return (
        <form action={handlerSalvar} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Nome Completo</label>
                    <input 
                        value={prof.name} 
                        onChange={e => setProf(new Professor(prof.codigo, e.target.value, prof.cpf, prof.ativo))}
                        className="bg-transparent border-b border-neutral-800 p-2 text-white focus:border-orange-500 outline-none transition-all font-light text-lg" 
                        required 
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Documento CPF</label>
                    <input 
                        value={prof.cpf} 
                        onChange={e => setProf(new Professor(prof.codigo, prof.name, e.target.value, prof.ativo))}
                        className="bg-transparent border-b border-neutral-800 p-2 text-white focus:border-orange-500 outline-none transition-all font-mono text-lg" 
                        required 
                    />
                </div>
            </div>
            <div className="flex justify-end pt-6">
                <button type="submit" className="bg-white text-black px-12 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-orange-500 hover:text-white transition-all active:scale-95">
                    {professorExistente ? 'Salvar Alterações' : 'Confirmar Registro'}
                </button>
            </div>
        </form>
    );
}