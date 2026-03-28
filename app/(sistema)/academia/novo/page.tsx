'use client'

import Link from "next/link";
import AcademiaForm from "../componets/AcademiaForm";
// Ajustado para o componente de Academia que criamos

export default function CadastrarAcademia() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in slide-in-from-top-4 duration-500">
            {/* CABEÇALHO ESTILIZADO */}
            <header className="border-b border-neutral-800 pb-8">
                <Link 
                    href="/academia" 
                    className="text-[10px] font-black text-neutral-600 hover:text-orange-500 uppercase tracking-widest flex items-center gap-2 mb-6 transition-colors"
                >
                    ← Voltar para Listagem
                </Link>
                
                <h1 className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                    Expansão de Rede
                </h1>
                
                <h2 className="text-4xl font-light text-white italic">
                    Registrar Nova <span className="font-bold text-orange-500 underline decoration-1 underline-offset-8">Unidade</span>
                </h2>
            </header>
            
            {/* CONTAINER DO FORMULÁRIO */}
            <div className="bg-neutral-900/20 p-8 border border-neutral-900 rounded-sm shadow-2xl shadow-black/50">
                <p className="text-neutral-500 text-[9px] uppercase tracking-[0.2em] mb-8 italic">
                    Preencha os dados institucionais para habilitar o acesso da nova academia.
                </p>
                
                <AcademiaForm />
            </div>

            {/* RODAPÉ DE AUXÍLIO */}
            <div className="flex justify-between items-center pt-4">
                <span className="text-[8px] text-neutral-800 uppercase tracking-widest">
                    Protocolo de Registro v2.4
                </span>
                <div className="h-[1px] flex-grow mx-4 bg-neutral-900"></div>
            </div>
        </div>
    );
}