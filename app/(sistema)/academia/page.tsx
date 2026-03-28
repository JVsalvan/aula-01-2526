"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Academia } from "./componets/AcademiaForm";


export default function ListagemAcademias() {
  const [academias, setAcademias] = useState<Academia[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const response = await axios.get<Academia[]>('http://localhost:8080/academia');
      if (response.status !== 200) {
        alert("Erro ao carregar a lista de unidades!");
      }
      setAcademias(response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const  handlerAlterarStatus = async (academia: Academia) => {
    try {  
      debugger;
      const novoStatus = { 
        statusAcademia: academia.status === "ATIVO" ? "INATIVO" : "ATIVO" 
      };

      const dadosResult = await axios.put<number>(
        `http://localhost:8080/academia/${academia.id}/AlterarStatus`, 
        novoStatus
      );


      
      alert(`Status da unidade atualizado! Código: ${dadosResult.data}`);
      carregarDados(); // Recarrega a lista para refletir a mudança
    } catch (error) {
      alert("Erro ao alterar o status da unidade.");
    }
  };

  return (
    <div className="space-y-8 p-6 animate-in fade-in duration-500">
      {/* HEADER DA PÁGINA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-800 pb-8">
        <div>
          <h1 className="text-sm font-bold text-orange-500 uppercase tracking-[0.3em] mb-2">
            Gestão Corporativa
          </h1>
          <h2 className="text-4xl font-light text-white tracking-tight italic">
            Nossas <span className="font-semibold text-orange-500">Unidades</span>
          </h2>
        </div>

        <Link
          href="/academia/novo"
          className="bg-white text-black px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300"
        >
          + Registrar Unidade
        </Link>
      </div>

      {/* TABELA ESTILIZADA */}
      <div className="w-full overflow-hidden border border-neutral-900 bg-neutral-900/10 rounded-sm">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="text-neutral-600 border-b border-neutral-800 bg-neutral-900/30">
              <th className="p-4 font-black uppercase text-[10px] tracking-widest">Código</th>
              <th className="p-4 font-black uppercase text-[10px] tracking-widest">Unidade</th>
              <th className="p-4 font-black uppercase text-[10px] tracking-widest">E-mail de Contato</th>
              <th className="p-4 font-black uppercase text-[10px] tracking-widest">Status</th>
              <th className="p-4 font-black uppercase text-[10px] tracking-widest text-right">Gestão</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {academias.map((unidade) => (
              <tr key={unidade.id} className="group hover:bg-neutral-900/40 transition-colors">
                <td className="p-4 font-mono text-neutral-500 text-xs">#{unidade.id}</td>
                <td className="p-4 font-medium text-neutral-200">{unidade.name}</td>
                <td className="p-4 text-neutral-500">{unidade.email}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold uppercase tracking-tighter px-2 py-1 rounded-full ${
                    unidade.status === 'ATIVO'
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {unidade.status === 'ATIVO' ? '● Ativa' : '○ Inativa'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-4">
                  <Link
                    href={`/academia/${unidade.id}/editar`}
                    className="text-[10px] font-bold text-neutral-500 hover:text-white uppercase tracking-widest transition-colors"
                  >
                    Configurar
                  </Link>
                  <button
                    onClick={() => handlerAlterarStatus(unidade)}
                    className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                      unidade.status === 'ATIVO'
                        ? 'text-red-500/50 hover:text-red-500'
                        : 'text-emerald-500/50 hover:text-emerald-500'
                    }`}
                  >
                    {unidade.status === 'ATIVO' ? 'Desativar' : 'Reativar'}
                  </button>
                </td>
              </tr>
            ))}

            {/* ESTADO VAZIO */}
            {academias.length === 0 && (
              <tr>
                <td colSpan={5} className="p-20 text-center text-neutral-600 italic text-sm tracking-widest uppercase">
                  Nenhuma academia registrada no ecossistema.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}