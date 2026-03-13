"use client"

import { Usuario } from "@/app/context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Usuarioform() {
    const router = useRouter();
    const [usuario, setUsuario] = useState<Usuario>(new Usuario(0, '', '', true));

    const handleChange = (campo: 'name' | 'cpf', valor: string) => {
        setUsuario(prev =>
            new Usuario(
                prev.codigo,
                campo === 'name' ? valor : prev.name,
                campo === 'cpf' ? valor : prev.cpf,
                prev.ativo
            )
        )
    }

    const handlerSalvar = async (formData: FormData) => {
        // Aqui você chamaria sua API
        console.log("Dados salvos:", usuario);
        router.push("/usuarios"); // Redireciona para a listagem
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* CABEÇALHO */}
            <header className="border-b border-neutral-800 pb-6">
                <h1 className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                    Administrativo
                </h1>
                <h2 className="text-white text-4xl font-light tracking-tighter italic">
                    Novo <span className="font-bold text-orange-500 underline decoration-1 underline-offset-8">Operador</span>
                </h2>
            </header>

            {/* FORMULÁRIO */}
            <form action={handlerSalvar} className="space-y-8 bg-neutral-900/20 p-8 border border-neutral-900 rounded-sm">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* NOME COMPLETO */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            required
                            value={usuario.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Rafael Cândido"
                            className="bg-neutral-950 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all placeholder:text-neutral-700"
                        />
                    </div>

                    {/* CPF */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                            Documento CPF
                        </label>
                        <input
                            type="text"
                            required
                            maxLength={14}
                            value={usuario.cpf}
                            onChange={(e) => handleChange('cpf', e.target.value)}
                            placeholder="000.000.000-00"
                            className="bg-neutral-950 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all placeholder:text-neutral-700"
                        />
                    </div>
                </div>

                {/* BOTÕES DE AÇÃO */}
                <div className="flex items-center justify-end gap-6 pt-4 border-t border-neutral-900">
                    <Link 
                        href="/usuarios" 
                        className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                    >
                        Cancelar
                    </Link>
                    
                    <button 
                        type="submit"
                        className="bg-white text-black px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all duration-300 active:scale-95"
                    >
                        Confirmar Cadastro
                    </button>
                </div>
            </form>

            {/* NOTA DE RODAPÉ */}
            <p className="text-neutral-700 text-[9px] uppercase tracking-widest text-center">
                Campos obrigatórios protegidos por protocolo de segurança
            </p>
        </div>
    )
}
 