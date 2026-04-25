"use client"

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import axios from "axios";
import { Academia } from "@/app/types/academia";
import { buscarTodos } from "@/app/services/academiaService";

export default function ListagemAcademias() {
  const [academias, setAcademias] = useState<Academia[]>([]);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("TODOS");

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const response = await buscarTodos();
      if (response) {
        setAcademias(response);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handlerAlterarStatus = async (academia: Academia) => {
    try {
      const novoStatus = { 
        statusAcademia: academia.status === "ATIVO" ? "INATIVO" : "ATIVO" 
      };
      await axios.put(`http://localhost:8080/academia/${academia.id}/AlterarStatus`, novoStatus);
      carregarDados();
    } catch (error) {
      alert("Erro ao alterar o status.");
    }
  };

  // Lógica de filtragem sem mudar o estado original
  const academiasFiltradas = useMemo(() => {
    return academias.filter(a => {
      const matchBusca = a.name.toLowerCase().includes(busca.toLowerCase()) || 
                         a.email.toLowerCase().includes(busca.toLowerCase());
      const matchStatus = filtroStatus === "TODOS" || a.status === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [academias, busca, filtroStatus]);

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

      {/* BARRA DE FERRAMENTAS (O QUE FALTAVA) */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-neutral-900/10 p-4 border border-neutral-900 rounded-sm">
        <div className="flex gap-4 w-full md:w-auto">
          <input 
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="bg-neutral-950 border border-neutral-800 text-[10px] text-white px-4 py-2 rounded-sm focus:outline-none focus:border-orange-500 w-full md:w-80 uppercase tracking-widest transition-all"
          />
          <select 
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="bg-neutral-950 border border-neutral-800 text-[10px] text-neutral-400 px-4 py-2 rounded-sm focus:outline-none focus:border-orange-500 uppercase tracking-widest outline-none"
          >
            <option value="TODOS">Todos os Status</option>
            <option value="ATIVO">Ativos</option>
            <option value="INATIVO">Inativos</option>
          </select>
        </div>
        <span className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">
          Total: {academiasFiltradas.length} Unidades
        </span>
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
            {academiasFiltradas.map((unidade) => (
              <tr key={unidade.id} className="group hover:bg-neutral-900/40 transition-colors">
                <td className="p-4 font-mono text-neutral-500 text-xs">#{unidade.id}</td>
                <td className="p-4 font-medium text-neutral-200 uppercase text-xs">{unidade.name}</td>
                <td className="p-4 text-neutral-500 text-xs">{unidade.email}</td>
                <td className="p-4">
                  <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded-full border ${
                    unidade.status === 'ATIVO'
                      ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20'
                      : 'bg-red-500/5 text-red-500 border-red-500/20'
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

            {academiasFiltradas.length === 0 && (
              <tr>
                <td colSpan={5} className="p-20 text-center text-neutral-600 italic text-sm tracking-widest uppercase">
                  Nenhum resultado encontrado para os filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}