'use client'

import Link from "next/link";
import AcademiaForm from "../componets/AcademiaForm";

export default function CadastrarAcademia() {
    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
            {/* CABEÇALHO COM ESTILO "ELITE MANAGEMENT" */}
            <header className="border-b border-neutral-800 pb-10">
                <Link 
                    href="/academia" 
                    className="text-[10px] font-black text-neutral-600 hover:text-orange-500 uppercase tracking-[0.3em] flex items-center gap-2 mb-8 transition-all group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Voltar para Gestão
                </Link>
                
                <div className="space-y-2">
                    <h1 className="text-orange-500 text-[11px] font-black uppercase tracking-[0.5em]">
                        Expansão de Rede • Protocolo v2.4
                    </h1>
                    <h2 className="text-5xl font-light text-white tracking-tighter italic">
                        Registrar Nova <span className="font-bold text-orange-500 underline decoration-1 underline-offset-[12px]">Unidade</span>
                    </h2>
                </div>
            </header>
            
            {/* CONTAINER PRINCIPAL (ESTILO TABELA DE GESTÃO) */}
            <div className="bg-neutral-900/10 border border-neutral-900 rounded-sm overflow-hidden shadow-2xl shadow-black/60">
                {/* SUB-HEADER INTERNO */}
                <div className="bg-neutral-900/30 p-6 border-b border-neutral-800">
                    <p className="text-neutral-400 text-[10px] uppercase tracking-[0.2em] font-medium italic">
                        Preencha os identificadores institucionais para habilitar o provisionamento da nova unidade no ecossistema.
                    </p>
                </div>

                <div className="p-10">
                    <AcademiaForm />
                </div>
            </div>

            {/* RODAPÉ DE STATUS */}
            <div className="flex justify-between items-center pt-6 opacity-40">
                <span className="text-[9px] text-neutral-500 uppercase tracking-[0.4em]">
                    FitManager Cloud Interface
                </span>
                <div className="h-[1px] flex-grow mx-8 bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>
                <span className="text-[9px] text-orange-500/50 uppercase tracking-[0.4em] font-black">
                    Aguardando Dados
                </span>
            </div>
        </div>
    );
}