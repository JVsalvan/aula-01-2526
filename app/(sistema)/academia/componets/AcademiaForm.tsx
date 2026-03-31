'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

// Classe Academia atualizada com os novos campos
export class Academia {
    constructor(
        public id: number | null,
        public name: string,
        public email: string,
        public cnpj: string,
        public telefone: string,
        public localizacao: string,
        public endereco: string,
        public status: string
    ) { }
}

interface AcademiaFormProps {
    academiaExistente?: Academia
}

export default function AcademiaForm({ academiaExistente }: AcademiaFormProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    
    const [academia, setAcademia] = useState<Academia>(
        academiaExistente || new Academia(null, '', '', '', '', '', '', "ATIVO")
    );

    // Tipagem atualizada para os novos campos
    const handleChange = (campo: keyof Academia, valor: string) => {
        setAcademia(prev => ({
            ...prev,
            [campo]: valor
        } as Academia));
    }

    const handlerSalvar = async (e: React.FormEvent) => {
        e.preventDefault(); // Usando submit tradicional para controlar o estado de loading
        setIsPending(true);

        try {
            let dadosResult;
            if (academiaExistente && academiaExistente.id) {
                dadosResult = await axios.put<number>(`http://localhost:8080/academia/${academiaExistente.id}`, academia);
                alert("Unidade atualizada! ID: " + dadosResult.data);
            } else {
                dadosResult = await axios.post<number>('http://localhost:8080/academia', academia);
                alert("Unidade registrada! ID: " + dadosResult.data);
            }

            router.push("/academia");
            router.refresh();
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao processar requisição.");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <header className="border-b border-neutral-800 pb-6">
                <h1 className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                    Gestão Corporativa
                </h1>
                <h2 className="text-white text-4xl font-light tracking-tighter italic">
                    {academiaExistente ? 'Configurar' : 'Nova'} <span className="font-bold text-orange-500 underline decoration-1 underline-offset-8">Unidade</span>
                </h2>
            </header>

            <form onSubmit={handlerSalvar} className="space-y-8 bg-neutral-900/20 p-8 border border-neutral-900 rounded-sm shadow-2xl shadow-black/50">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {/* NOME DA UNIDADE */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">Nome Identificador</label>
                        <input
                            type="text" required value={academia.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Ex: Unidade Centro"
                            className="bg-neutral-950 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500 transition-all placeholder:text-neutral-800"
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">E-mail de Contato</label>
                        <input
                            type="email" required value={academia.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="unidade@academia.com"
                            className="bg-neutral-950 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500 transition-all placeholder:text-neutral-800"
                        />
                    </div>

                    {/* CNPJ (NOVO) */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">CNPJ da Unidade</label>
                        <input
                            type="text" value={academia.cnpj}
                            onChange={(e) => handleChange('cnpj', e.target.value)}
                            placeholder="00.000.000/0001-00"
                            className="bg-neutral-950 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500 transition-all placeholder:text-neutral-800"
                        />
                    </div>

                    {/* TELEFONE (NOVO) */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">Telefone / WhatsApp</label>
                        <input
                            type="text" value={academia.telefone}
                            onChange={(e) => handleChange('telefone', e.target.value)}
                            placeholder="(11) 99999-9999"
                            className="bg-neutral-950 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500 transition-all placeholder:text-neutral-800"
                        />
                    </div>

                    {/* LOCALIZAÇÃO (NOVO) */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">Cidade / UF</label>
                        <input
                            type="text" value={academia.localizacao}
                            onChange={(e) => handleChange('localizacao', e.target.value)}
                            placeholder="Ex: São Paulo / SP"
                            className="bg-neutral-950 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500 transition-all placeholder:text-neutral-800"
                        />
                    </div>

                    {/* ENDEREÇO (NOVO) */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">Logradouro Completo</label>
                        <input
                            type="text" value={academia.endereco}
                            onChange={(e) => handleChange('endereco', e.target.value)}
                            placeholder="Rua, Número, Bairro"
                            className="bg-neutral-950 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500 transition-all placeholder:text-neutral-800"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-6 pt-6 border-t border-neutral-900">
                    <Link href="/academia" className="text-neutral-600 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">
                        Cancelar
                    </Link>
                    
                    <button 
                        type="submit"
                        disabled={isPending}
                        className={`bg-white text-black px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 flex items-center gap-2
                            ${isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500 hover:text-white'}`}
                    >
                        {isPending ? 'Sincronizando...' : (academiaExistente ? 'Salvar Alterações' : 'Confirmar Registro')}
                    </button>
                </div>
            </form>

            <p className="text-neutral-800 text-[9px] uppercase tracking-widest text-center italic">
                Cuidado: Os dados inseridos refletirão diretamente no acesso de novos usuários à unidade.
            </p>
        </div>
    )
}