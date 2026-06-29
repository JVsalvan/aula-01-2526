
"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { invalidateDashboard } from "@/app/redux/slices/dashboardSlice";

import { Aluno, AlunoFormProps } from "@/app/types/alunos";
import { planoService, Plano } from "@/app/services/planoService";

import {
    alterarAluno,
    salvarAluno
} from "@/app/services/alunoService";

export default function AlunoForm({
    alunoExistente
}: AlunoFormProps) {

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const [aluno, setAluno] = useState<Aluno>(
        alunoExistente ||
        new Aluno(
            null,
            '',
            '',
            '',
            '',
            'ATIVO',
            undefined
        )
    );

    const [planos, setPlanos] = useState<Plano[]>([]);

    const carregarPlanos = async () => {
            try {
                const lista = await planoService.listarTodos();
                setPlanos(lista.filter(p => p.ativo));
            } catch (error) {
                console.error("Erro ao carregar planos", error);
            }
        };

    useEffect(() => {
        carregarPlanos();
    }, []);

    const handleChange = (
        campo: 'nome' | 'cpf' | 'telefone' | 'dataNascimento' | 'planoId',
        valor: string
    ) => {

        setAluno(prev =>
            new Aluno(
                prev.id,

                campo === 'nome'
                    ? valor
                    : prev.nome,

                campo === 'cpf'
                    ? valor
                    : prev.cpf,

                campo === 'telefone'
                    ? valor
                    : prev.telefone,

                campo === 'dataNascimento'
                    ? valor
                    : prev.dataNascimento,

                prev.status,

                campo === 'planoId'
                    ? parseInt(valor)
                    : prev.planoId
            )
        );
    };

    const handlerSalvar = async () => {

        try {

            if (alunoExistente?.id) {

                const codigo = await alterarAluno(
                    aluno,
                    alunoExistente.id
                );

                dispatch(invalidateDashboard());
                alert(
                    "Aluno atualizado! Código: " +
                    codigo
                );

            } else {

                const codigo = await salvarAluno(
                    aluno
                );

                dispatch(invalidateDashboard());
                alert(
                    "Aluno saved! Código: " +
                    codigo
                );
            }

            router.push("/alunos");

        } catch {

            alert(
                "Erro ao salvar aluno."
            );
        }
    };

    console.log(planos)

    return (

        <div className="max-w-4xl mx-auto space-y-8">

            <header className="border-b border-neutral-800 pb-6">

                <h1 className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                    Administrativo
                </h1>

                <h2 className="text-white text-4xl font-light tracking-tighter italic">
                    Cadastro de{" "}
                    <span className="font-bold text-orange-500 underline decoration-1 underline-offset-8">
                        Aluno
                    </span>
                </h2>

            </header>

            <div className="space-y-8 bg-neutral-900/20 p-8 border border-neutral-900 rounded-sm">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="flex flex-col gap-2">

                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                            Nome
                        </label>

                        <input
                            type="text"
                            value={aluno.nome}
                            onChange={(e) =>
                                handleChange(
                                    'nome',
                                    e.target.value
                                )
                            }
                            className="bg-neutral-950 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm"
                        />

                    </div>

                    <div className="flex flex-col gap-2">

                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                            CPF
                        </label>

                        <input
                            type="text"
                            value={aluno.cpf}
                            onChange={(e) =>
                                handleChange(
                                    'cpf',
                                    e.target.value
                                )
                            }
                            className="bg-neutral-950 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm"
                        />

                    </div>

                    <div className="flex flex-col gap-2">

                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                            Telefone
                        </label>

                        <input
                            type="text"
                            value={aluno.telefone}
                            onChange={(e) =>
                                handleChange(
                                    'telefone',
                                    e.target.value
                                )
                            }
                            className="bg-neutral-950 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm"
                        />

                    </div>

                    <div className="flex flex-col gap-2">

                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                            Email
                        </label>

                        <input
                            type="date"
                            value={aluno.dataNascimento}
                            onChange={(e) =>
                                handleChange(
                                    'dataNascimento',
                                    e.target.value.toString()
                                )
                            }
                            className="bg-neutral-950 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm"
                        />

                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                            Plano
                        </label>
                        <select
                            value={aluno.planoId || ""}
                            onChange={(e) => handleChange('planoId', e.target.value)}
                            className="bg-neutral-950 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm"
                            disabled={!!alunoExistente}
                        >
                            <option value="">Selecione um plano</option>
                            {planos.map(plano => (
                                <option key={plano.id} value={plano.id}>
                                    {plano.descricao} - R$ {plano.valor.toFixed(2)}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="flex justify-end gap-6 pt-4 border-t border-neutral-900">

                    <Link
                        href="/alunos"
                        className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest hover:text-white"
                    >
                        Cancelar
                    </Link>

                    <button
                        onClick={handlerSalvar}
                        type="button"
                        className="bg-white text-black px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white"
                    >
                        Salvar
                    </button>

                </div>

            </div>

        </div>
    );
}

