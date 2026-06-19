'use client'

import Link from "next/link";
import AcademiaForm from "../componets/AcademiaForm";

export default function CadastrarAcademia() {

    return (

        <div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">

            {/* CABEÇALHO */}
            <header className="border-b border-neutral-800 pb-10">

                <Link
                    href="/academia"
                    className="text-[10px] font-black text-neutral-600 hover:text-orange-500 uppercase tracking-[0.3em] flex items-center gap-2 mb-8 transition-all group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">
                        ←
                    </span>

                    Voltar para listagem
                </Link>

                <div className="space-y-2">

                    <h1 className="text-orange-500 text-[11px] font-black uppercase tracking-[0.5em]">
                        Expansão de Rede • Protocolo v2.4
                    </h1>

                    <h2 className="text-5xl font-light text-white tracking-tighter italic">
                        Registrar Nova{" "}

                        <span className="font-bold text-orange-500 underline decoration-1 underline-offset-[12px]">
                            Unidade
                        </span>
                    </h2>

                    <p className="text-sm text-neutral-500">
                        Preencha os dados para registrar uma nova unidade no sistema.
                    </p>

                </div>
            </header>

            {/* CONTAINER */}
            <div className="bg-neutral-900/10 border border-neutral-900 rounded-sm shadow-2xl shadow-black/60 p-10">

                <AcademiaForm />

            </div>

        </div>
    );
}