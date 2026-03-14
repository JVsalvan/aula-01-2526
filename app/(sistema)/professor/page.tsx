"use client"

import { Usuario as Professor } from "@/app/context/AuthContext";
import { UsuarioMock as ProfessorMock } from "@/app/mock/usuario";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ListagemProfessores() {
  const [professores, setProfessores] = useState<Professor[]>([]);

  useEffect(() => { carregarDados(); }, []);

  const carregarDados = async () => {
    try {
      const dados = await ProfessorMock.ListarTodos();
      setProfessores(dados);
    } catch (error) { console.error(error); }
  };

  const handlerAlterarStatus = async (prof: Professor) => {
    try {
      // Chamada ao Mock para persistência real
      await ProfessorMock.alterarStatus(prof.codigo);
      setProfessores(atuais => atuais.map(p =>
        p.codigo === prof.codigo ? { ...p, ativo: !p.ativo } : p
      ));
    } catch (error) { alert("Erro ao alterar status"); }
  };

  return (
    <div className="space-y-8 p-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-neutral-800 pb-8">
        <div>
          <h1 className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Staff Management</h1>
          <h2 className="text-4xl font-light text-white italic">Corpo de <span className="font-bold text-orange-500">Professores</span></h2>
        </div>
        <Link href="/usuarios/novo" className="bg-orange-500 text-white px-6 py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg shadow-orange-500/10">+ Novo Instrutor</Link>
      </div>

      <div className="border border-neutral-900 bg-neutral-900/10 rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-900/50 text-[10px] font-black uppercase tracking-widest text-neutral-500">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Nome do Especialista</th>
              <th className="p-4">CPF</th>
              <th className="p-4">Disponibilidade</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {professores.map((p) => (
              <tr key={p.codigo} className="group hover:bg-white/[0.02] transition-colors">
                <td className="p-4 font-mono text-neutral-600">#{p.codigo}</td>
                <td className="p-4 text-neutral-200 font-medium">{p.name}</td>
                <td className="p-4 text-neutral-500 font-mono">{p.cpf}</td>
                <td className="p-4">
                  <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-sm ${p.ativo ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {p.ativo ? '● Ativo' : '○ Inativo'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-4">
                  <Link href={`/usuarios/${p.codigo}/editar`} className="text-[10px] font-bold text-neutral-500 hover:text-orange-500 uppercase tracking-tighter">Editar</Link>
                  <button onClick={() => handlerAlterarStatus(p)} className={`text-[10px] font-bold uppercase ${p.ativo ? 'text-red-900 hover:text-red-500' : 'text-emerald-900 hover:text-emerald-500'}`}>
                    {p.ativo ? 'Desativar' : 'Reativar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}