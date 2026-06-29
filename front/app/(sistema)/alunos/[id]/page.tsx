"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { invalidateDashboard } from "@/app/redux/slices/dashboardSlice";
import Link from "next/link";
import { buscarAlunoPorId, renovarPlanoAluno, cancelarPlanoAluno } from "@/app/services/alunoService";
import { deletarFichaTreino } from "@/app/services/fichaTreinoService";
import { AlunoDetalhes } from "@/app/types/alunos";
import ModalFichaTreino from "../components/ModalFichaTreino";
import ModalTrocarPlano from "../components/ModalTrocarPlano";

export default function DetalhesAluno() {
    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const id = Number(params.id);

    const [aluno, setAluno] = useState<AlunoDetalhes | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalFichaOpen, setIsModalFichaOpen] = useState(false);
    const [isModalTrocarPlanoOpen, setIsModalTrocarPlanoOpen] = useState(false);

    const carregarDados = async () => {
        setLoading(true);
        try {
            const dados = await buscarAlunoPorId(id);
            if (dados) {
                setAluno(dados);
            } else {
                router.push("/alunos");
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao carregar dados do aluno");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) carregarDados();
    }, [id]);

    const handleRenovarPlano = async () => {
        if (confirm("Deseja realmente renovar o plano deste aluno?")) {
            try {
                await renovarPlanoAluno(id);
                dispatch(invalidateDashboard());
                alert("Plano renovado com sucesso!");
                carregarDados();
            } catch (error) {
                alert("Erro ao renovar plano");
            }
        }
    };

    const handleCancelarPlano = async () => {
        if (confirm("Deseja realmente cancelar o plano deste aluno?")) {
            try {
                await cancelarPlanoAluno(id);
                dispatch(invalidateDashboard());
                alert("Plano cancelado com sucesso!");
                carregarDados();
            } catch (error) {
                alert("Erro ao cancelar plano");
            }
        }
    };

    const handleDeleteFicha = async (fichaId: number) => {
        if (confirm("Deseja realmente excluir esta ficha de treino?")) {
            try {
                await deletarFichaTreino(fichaId);
                carregarDados();
            } catch (error) {
                alert("Erro ao deletar ficha");
            }
        }
    };

    if (loading) return <div className="text-white p-8">Carregando...</div>;
    if (!aluno) return <div className="text-white p-8">Aluno não encontrado</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-800 pb-8">
                <div>
                    <h1 className="text-sm font-bold text-orange-500 uppercase tracking-[0.3em] mb-2">
                        Perfil do Aluno
                    </h1>
                    <h2 className="text-4xl font-light text-white tracking-tight italic">
                        {aluno.nome}
                    </h2>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/alunos"
                        className="border border-neutral-700 text-white px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300"
                    >
                        Voltar
                    </Link>
                    <Link
                        href={`/alunos/${aluno.id}/editar`}
                        className="bg-white text-black px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300"
                    >
                        Editar Aluno
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Informações Gerais */}
                <div className="bg-neutral-900/40 p-6 border border-neutral-800 rounded-sm">
                    <h3 className="text-orange-500 font-bold uppercase text-[10px] tracking-widest mb-4">Informações</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-neutral-500 text-[10px] uppercase font-bold">CPF</p>
                            <p className="text-white">{aluno.cpf}</p>
                        </div>
                        <div>
                            <p className="text-neutral-500 text-[10px] uppercase font-bold">Telefone</p>
                            <p className="text-white">{aluno.telefone}</p>
                        </div>
                        <div>
                            <p className="text-neutral-500 text-[10px] uppercase font-bold">Status</p>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-sm ${aluno.status === 'ATIVO' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                {aluno.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Plano */}
                <div className="bg-neutral-900/40 p-6 border border-neutral-800 rounded-sm md:col-span-2">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-orange-500 font-bold uppercase text-[10px] tracking-widest">Plano Atual</h3>
                        <div className="flex gap-2">
                            {aluno.plano?.status !== 'CANCELADO' && (
                                <button 
                                    onClick={handleCancelarPlano}
                                    className="text-white border border-red-500/50 px-4 py-1.5 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:bg-red-500 transition-colors"
                                >
                                    Cancelar Plano
                                </button>
                            )}
                            <button 
                                onClick={() => setIsModalTrocarPlanoOpen(true)}
                                className="text-white border border-neutral-700 px-4 py-1.5 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                            >
                                Trocar Plano
                            </button>
                            <button 
                                onClick={handleRenovarPlano}
                                className="text-white bg-orange-500 px-4 py-1.5 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-colors"
                            >
                                Renovar Plano
                            </button>
                        </div>
                    </div>
                    {aluno.plano ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <p className="text-neutral-500 text-[10px] uppercase font-bold">Descrição</p>
                                <p className="text-white font-semibold">{aluno.plano.plano.descricao}</p>
                            </div>
                            <div>
                                <p className="text-neutral-500 text-[10px] uppercase font-bold">Data Adesão</p>
                                <p className="text-white">{new Date(aluno.plano.dataAdesao).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-neutral-500 text-[10px] uppercase font-bold">Vencimento</p>
                                <p className={`font-bold ${aluno.plano.proximoVencimento ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                                    {new Date(aluno.plano.dataExpiracao).toLocaleDateString()}
                                    {aluno.plano.proximoVencimento && <span className="block text-[8px] uppercase tracking-tighter">Vencendo em breve!</span>}
                                </p>
                            </div>
                            <div>
                                <p className="text-neutral-500 text-[10px] uppercase font-bold">Status</p>
                                <p className="text-white">{aluno.plano.status}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-neutral-500 italic">Nenhum plano vinculado.</p>
                    )}
                </div>
            </div>

            {/* Fichas de Treino */}
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
                    <h2 className="text-2xl font-light text-white italic">
                        Fichas de <span className="font-semibold text-orange-500">Treino</span>
                    </h2>
                    <button 
                        onClick={() => setIsModalFichaOpen(true)}
                        className="bg-white text-black px-4 py-1.5 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all"
                    >
                        + Nova Ficha
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {aluno.fichasTreino && aluno.fichasTreino.length > 0 ? (
                        aluno.fichasTreino.map((ficha) => (
                            <div key={ficha.id} className="bg-neutral-900/20 border border-neutral-800 rounded-sm overflow-hidden">
                                <div className="bg-neutral-900/60 p-4 flex justify-between items-center border-b border-neutral-800">
                                    <h4 className="text-white font-bold uppercase text-xs tracking-widest">
                                        Objetivo: <span className="text-orange-500">{ficha.objetivo}</span>
                                    </h4>
                                    <button 
                                        onClick={() => handleDeleteFicha(ficha.id)}
                                        className="text-red-500 hover:text-red-400 text-[10px] uppercase font-bold tracking-widest"
                                    >
                                        Excluir
                                    </button>
                                </div>
                                <div className="p-0 overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="text-neutral-500 uppercase font-black tracking-tighter border-b border-neutral-800/50">
                                                <th className="p-3">Exercício</th>
                                                <th className="p-3 text-center">Séries</th>
                                                <th className="p-3 text-center">Repetições</th>
                                                <th className="p-3 text-center">Descanso</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-800/30">
                                            {ficha.exercicios.map((ex) => (
                                                <tr key={ex.id} className="hover:bg-neutral-800/20">
                                                    <td className="p-3 text-neutral-200 font-medium">{ex.nome}</td>
                                                    <td className="p-3 text-center text-neutral-400">{ex.series}</td>
                                                    <td className="p-3 text-center text-neutral-400">{ex.repeticoes}</td>
                                                    <td className="p-3 text-center text-neutral-400">{ex.descanso}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 border border-dashed border-neutral-800 text-center">
                            <p className="text-neutral-500 italic">Nenhuma ficha de treino cadastrada para este aluno.</p>
                        </div>
                    )}
                </div>
            </div>
            
            <ModalFichaTreino 
                alunoId={id} 
                isOpen={isModalFichaOpen} 
                onClose={() => setIsModalFichaOpen(false)} 
                onSuccess={() => {
                    dispatch(invalidateDashboard());
                    carregarDados();
                }}
            />

            <ModalTrocarPlano
                isOpen={isModalTrocarPlanoOpen}
                onClose={() => setIsModalTrocarPlanoOpen(false)}
                onSuccess={carregarDados}
                alunoId={id}
                planoAtualId={aluno.plano?.plano.id}
            />
        </div>
    );
}
