"use client"
import Link from "next/link";
// Ajustado: Nome do componente e caminho semântico
import ProfessorForm from "../componets/ProfessorForm"; 

export default function CadastrarProfessor() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in slide-in-from-top-4 duration-500">
            <header className="border-b border-neutral-800 pb-8">
                <Link href="/professor" className="text-[10px] font-black text-neutral-600 hover:text-orange-500 uppercase tracking-widest flex items-center gap-2 mb-6">← Voltar</Link>
                <h1 className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Novo Contrato</h1>
                <h2 className="text-4xl font-light text-white italic">Cadastrar <span className="font-bold text-orange-500">Instrutor</span></h2>
            </header>
            
            <div className="bg-neutral-900/20 p-8 border border-neutral-900 rounded-sm">
                {/* Chamada correta do componente */}
                <ProfessorForm />
            </div>
        </div>
    );
}