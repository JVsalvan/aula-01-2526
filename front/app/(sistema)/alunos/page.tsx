
"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

import { Aluno } from "@/app/types/alunos";
import {
    alterarStatusAluno,
    buscarListaAlunos
} from "@/app/services/alunoService";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { invalidateDashboard } from "@/app/redux/slices/dashboardSlice";

export default function Alunos() {

    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    

    const carregarDados = async () => {

        try {

            const dados = await buscarListaAlunos();

            setAlunos(dados);

        } catch (error) {

            alert("Erro ao carregar dados dos alunos");

            console.error(error);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    const handlerAlterarStatus = async (
        aluno: Aluno
    ) => {

        try {

            await alterarStatusAluno(aluno);

            dispatch(invalidateDashboard());
            carregarDados();

            alert(
                "Status alterado com sucesso!"
            );

        } catch (error) {

            alert(
                "Erro ao alterar status do aluno"
            );
        }
    };

    return (

        <div className="space-y-8">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-800 pb-8">

                <div>

                    <h1 className="text-sm font-bold text-orange-500 uppercase tracking-[0.3em] mb-2">
                        Administração
                    </h1>

                    <h2 className="text-4xl font-light text-white tracking-tight italic">
                        Gestão de{" "}
                        <span className="font-semibold text-orange-500">
                            Alunos
                        </span>
                    </h2>

                </div>

                <Link
                    href="/alunos/novo"
                    className="bg-white text-black px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                    + Novo Aluno
                </Link>

            </div>

            <div className="w-full overflow-hidden border border-neutral-900 bg-neutral-900/10 rounded-sm">

                <table className="w-full text-left text-sm border-collapse">

                    <thead>

                        <tr className="text-neutral-600 border-b border-neutral-800 bg-neutral-900/30">

                            <th className="p-4 font-black uppercase text-[10px] tracking-widest">
                                Código
                            </th>

                            <th className="p-4 font-black uppercase text-[10px] tracking-widest">
                                Nome
                            </th>

                            <th className="p-4 font-black uppercase text-[10px] tracking-widest">
                                CPF
                            </th>

                            <th className="p-4 font-black uppercase text-[10px] tracking-widest">
                                Telefone
                            </th>

                            <th className="p-4 font-black uppercase text-[10px] tracking-widest">
                                Status
                            </th>

                            <th className="p-4 font-black uppercase text-[10px] tracking-widest text-right">
                                Ações
                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-neutral-900">

                        {alunos.map((aluno) => (

                            <tr
                                key={aluno.id}
                                className="group hover:bg-neutral-900/40 transition-colors cursor-pointer"
                                onClick={() => router.push(`/alunos/${aluno.id}`)}
                            >

                                <td className="p-4 font-mono text-neutral-500 text-xs">
                                    #{aluno.id}
                                </td>

                                <td className="p-4 font-medium text-neutral-200">
                                    {aluno.nome}
                                </td>

                                <td className="p-4 text-neutral-500">
                                    {aluno.cpf}
                                </td>

                                <td className="p-4 text-neutral-500">
                                    {aluno.telefone}
                                </td>

                                <td className="p-4">

                                    <span
                                        className={`text-[10px] font-bold uppercase tracking-tighter px-2 py-1 rounded-full ${
                                            aluno.status === 'ATIVO'
                                                ? 'bg-emerald-500/10 text-emerald-500'
                                                : 'bg-red-500/10 text-red-500'
                                        }`}
                                    >

                                        {aluno.status === 'ATIVO'
                                            ? '● Ativo'
                                            : '○ Inativo'}

                                    </span>

                                </td>

                                <td className="p-4 text-right space-x-4">

                                    <Link
                                        href={`/alunos/${aluno.id}/editar`}
                                        className="text-[10px] font-bold text-neutral-500 hover:text-white uppercase tracking-widest transition-colors"
                                    >
                                        Editar
                                    </Link>

                                    <button
                                        onClick={() =>
                                            handlerAlterarStatus(aluno)
                                        }
                                        className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                                            aluno.status === 'ATIVO'
                                                ? 'text-red-500/50 hover:text-red-500'
                                                : 'text-emerald-500/50 hover:text-emerald-500'
                                        }`}
                                    >

                                        {aluno.status === 'ATIVO'
                                            ? 'Inativar'
                                            : 'Ativar'}

                                    </button>

                                </td>

                            </tr>

                        ))}

                        {alunos.length === 0 && (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="p-20 text-center text-neutral-600 italic text-sm tracking-widest uppercase"
                                >
                                    Nenhum aluno encontrado na base de dados.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}
