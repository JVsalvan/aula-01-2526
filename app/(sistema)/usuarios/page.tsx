"use client"

import { Usuario } from "@/app/context/AuthContext";
import { UsuarioMock } from "@/app/mock/usuario";
import { useEffect, useState } from "react";
import Link from "next/link"; // Import correto do Next.js

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const dados = await UsuarioMock.ListarTodos();
      setUsuarios(dados);
    } catch (error) {
      console.error(error);
    }
  };

  const handlerAlterarStatus = async (user: Usuario) => {
    try {
      // Mantendo sua lógica de inversão de status
      setUsuarios(usuariosAtuais => usuariosAtuais.map(u =>
        u.codigo === user.codigo
          ? { ...u, ativo: !u.ativo } // Simplifiquei a criação mantendo os dados
          : u
      ));
    } catch (error) {
      alert("Erro ao alterar o status do usuario");
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER DA PÁGINA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-800 pb-8">
        <div>
          <h1 className="text-sm font-bold text-orange-500 uppercase tracking-[0.3em] mb-2">Administração</h1>
          <h2 className="text-4xl font-light text-white tracking-tight italic">
            Gestão de <span className="font-semibold text-orange-500">Usuários</span>
          </h2>
        </div>
        
        <Link 
          href="/usuarios/novo" 
          className="bg-white text-black px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300"
        >
          + Novo Usuário
        </Link>
      </div>

      {/* TABELA ESTILIZADA */}
      <div className="w-full overflow-hidden border border-neutral-900 bg-neutral-900/10 rounded-sm">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="text-neutral-600 border-b border-neutral-800 bg-neutral-900/30">
              <th className="p-4 font-black uppercase text-[10px] tracking-widest">Código</th>
              <th className="p-4 font-black uppercase text-[10px] tracking-widest">Nome</th>
              <th className="p-4 font-black uppercase text-[10px] tracking-widest">CPF</th>
              <th className="p-4 font-black uppercase text-[10px] tracking-widest">Status</th>
              <th className="p-4 font-black uppercase text-[10px] tracking-widest text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {usuarios.map((user) => (
              <tr key={user.codigo} className="group hover:bg-neutral-900/40 transition-colors">
                <td className="p-4 font-mono text-neutral-500 text-xs">#{user.codigo}</td>
                <td className="p-4 font-medium text-neutral-200">{user.name}</td>
                <td className="p-4 text-neutral-500">{user.cpf}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold uppercase tracking-tighter px-2 py-1 rounded-full ${
                    user.ativo 
                    ? 'bg-emerald-500/10 text-emerald-500' 
                    : 'bg-red-500/10 text-red-500'
                  }`}>
                    {user.ativo ? '● Ativo' : '○ Inativo'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-4">
                  <Link 
                    href={`/usuarios/${user.codigo}/editar`}
                    className="text-[10px] font-bold text-neutral-500 hover:text-white uppercase tracking-widest transition-colors"
                  >
                    Editar
                  </Link>
                  <button 
                    onClick={() => handlerAlterarStatus(user)}
                    className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                      user.ativo 
                      ? 'text-red-500/50 hover:text-red-500' 
                      : 'text-emerald-500/50 hover:text-emerald-500'
                    }`}
                  >
                    {user.ativo ? 'Inativar' : 'Ativar'}
                  </button>
                </td>
              </tr>
            ))}
            
            {/* ESTADO VAZIO */}
            {usuarios.length === 0 && (
              <tr>
                <td colSpan={5} className="p-20 text-center text-neutral-600 italic text-sm tracking-widest uppercase">
                  Nenhum usuário encontrado na base de dados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}