'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

// Definição da Classe Academia
export class Academia {
    constructor(
        public id: number | null,
        public name: string,
        public email: string,
        public status: string
    ) { }
}

interface AcademiaFormProps {
    academiaExistente?: Academia
}

export default function AcademiaForm({ academiaExistente }: AcademiaFormProps) {
    const router = useRouter();
    
    // Inicializa o estado com a academia existente ou uma nova instância
    const [academia, setAcademia] = useState<Academia>(
        academiaExistente || new Academia(null, '', '', "ATIVO")
    );

    // Função de mudança de estado genérica
    const handleChange = (campo: 'name' | 'email', valor: string) => {
        setAcademia(prev =>
            new Academia(
                prev.id,
                campo === 'name' ? valor : prev.name,
                campo === 'email' ? valor : prev.email,
                prev.status
            )
        )
    }

    // Handler de salvamento adaptado para axios e endpoints de academia
    const handlerSalvar = async (formData: FormData) => {
        try {
            let dadosResult;
            
            if (academiaExistente && academiaExistente.id) {
                // Lógica de Edição (PUT)
                dadosResult = await axios.put<number>(`http://localhost:8080/academia/${academiaExistente.id}`, academia);
                alert("Academia atualizada com sucesso! Código: " + dadosResult.data);
            } else {
                // Lógica de Criação (POST)
                dadosResult = await axios.post<number>('http://localhost:8080/academia', academia);
                alert("Academia registrada com sucesso! Código: " + dadosResult.data);
            }

            console.log("Dados processados:", academia);
            router.push("/academia");
            router.refresh();
        } catch (error) {
            console.error("Erro ao salvar academia:", error);
            alert("Erro ao processar a requisição.");
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* CABEÇALHO */}
            <header className="border-b border-neutral-800 pb-6">
                <h1 className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                    Gestão Corporativa
                </h1>
                <h2 className="text-white text-4xl font-light tracking-tighter italic">
                    {academiaExistente ? 'Editar' : 'Nova'} <span className="font-bold text-orange-500 underline decoration-1 underline-offset-8">Unidade</span>
                </h2>
            </header>

            {/* FORMULÁRIO */}
            <form action={handlerSalvar} className="space-y-8 bg-neutral-900/20 p-8 border border-neutral-900 rounded-sm">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* NOME DA ACADEMIA */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                            Nome da Unidade
                        </label>
                        <input
                            type="text"
                            required
                            value={academia.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Ex: Unidade Centro"
                            className="bg-neutral-950 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all placeholder:text-neutral-700"
                        />
                    </div>

                    {/* EMAIL CORPORATIVO */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                            E-mail de Contato
                        </label>
                        <input
                            type="email"
                            required
                            value={academia.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="unidade@academia.com"
                            className="bg-neutral-950 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all placeholder:text-neutral-700"
                        />
                    </div>
                </div>

                {/* BOTÕES DE AÇÃO */}
                <div className="flex items-center justify-end gap-6 pt-4 border-t border-neutral-900">
                    <Link 
                        href="/academia" 
                        className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                    >
                        Cancelar
                    </Link>
                    
                    <button 
                        type="submit"
                        className="bg-white text-black px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all duration-300 active:scale-95"
                    >
                        {academiaExistente ? 'Salvar Alterações' : 'Confirmar Registro'}
                    </button>
                </div>
            </form>

            {/* NOTA DE RODAPÉ */}
            <p className="text-neutral-700 text-[9px] uppercase tracking-widest text-center">
                Registro de unidade sujeito aos termos de licença de uso do software
            </p>
        </div>
    )
}