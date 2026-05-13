'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

import { Academia } from "@/app/types/academia";
import {
    alterarStatusAcademia,
    buscarTodos
} from "@/app/services/academiaService";

export default function Academias() {

    const [academias, setAcademias] = useState<Academia[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {

        try {

            const dados = await buscarTodos();

            setAcademias(dados);

        } catch (error) {

            console.error(error);
        }
    }

    const handlerAlterarStatus = async (academia: Academia) => {

        try {

            setAcademias(academiasAtuais =>
                academiasAtuais.map(a =>
                    a.id === academia.id
                        ? {
                            ...a,
                            status: a.status === "ATIVO"
                                ? "INATIVO"
                                : "ATIVO"
                        }
                        : a
                )
            );

            await alterarStatusAcademia(academia);

        } catch (error) {

            alert("Erro ao alterar status da Academia!");
        }
    }

    return (

        <div className="max-w-5xl mx-auto p-6 space-y-8">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-6">

                <div>
                    <h1 className="text-3xl font-light italic text-white tracking-tight">
                        Gestão de{" "}
                        <span className="font-bold text-orange-500">
                            Academias
                        </span>
                    </h1>

                    <p className="text-neutral-500 text-sm mt-2">
                        Gerencie as unidades cadastradas no sistema.
                    </p>
                </div>

                <Link
                    href="/academia/nova"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all"
                >
                    + Nova Unidade
                </Link>
            </div>

            {/* TABELA */}
            <div className="bg-neutral-900/10 border border-neutral-900 rounded-sm overflow-hidden shadow-2xl shadow-black/50">

                <div className="overflow-x-auto">

                    <table className="w-full text-left border-collapse">

                        <thead>

                            <tr className="border-b border-neutral-800 bg-neutral-900/30">

                                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                                    ID
                                </th>

                                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                                    Nome
                                </th>

                                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-neutral-500 text-right">
                                    Ações
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {academias.map((academia) => (

                                <tr
                                    key={academia.id}
                                    className="border-b border-neutral-900 hover:bg-neutral-900/20 transition-colors"
                                >

                                    <td className="px-6 py-4 text-sm text-neutral-500 font-mono">
                                        #{academia.id}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-white font-medium">
                                        {academia.name}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-neutral-400">
                                        {academia.email}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full
                                                
                                                ${academia.status === "ATIVO"
                                                    ? 'bg-green-500/10 text-green-400'
                                                    : 'bg-red-500/10 text-red-400'
                                                }
                                            `}
                                        >
                                            {academia.status}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4 text-right space-x-4">

                                        <Link
                                            href={`/academia/${academia.id}/editar`}
                                            className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
                                        >
                                            Editar
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handlerAlterarStatus(academia)
                                            }
                                            className={`text-sm font-medium transition-colors
                                                
                                                ${academia.status === "ATIVO"
                                                    ? 'text-red-400 hover:text-red-300'
                                                    : 'text-green-400 hover:text-green-300'
                                                }
                                            `}
                                        >
                                            {academia.status === "ATIVO"
                                                ? 'Inativar'
                                                : 'Ativar'
                                            }
                                        </button>

                                    </td>

                                </tr>
                            ))}

                            {academias.length === 0 && (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="px-6 py-12 text-center text-neutral-500 italic"
                                    >
                                        Nenhuma academia encontrada!
                                    </td>

                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}