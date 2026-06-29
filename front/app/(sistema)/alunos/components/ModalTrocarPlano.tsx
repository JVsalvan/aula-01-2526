
"use client"

import { useEffect, useState } from "react";
import { planoService, Plano } from "@/app/services/planoService";
import { trocarPlanoAluno } from "@/app/services/alunoService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { invalidateDashboard } from "@/app/redux/slices/dashboardSlice";

interface ModalTrocarPlanoProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    alunoId: number;
    planoAtualId?: number;
}

export default function ModalTrocarPlano({ isOpen, onClose, onSuccess, alunoId, planoAtualId }: ModalTrocarPlanoProps) {
    const [planos, setPlanos] = useState<Plano[]>([]);
    const [planoSelecionado, setPlanoSelecionado] = useState<number | "">("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isOpen) {
            const carregarPlanos = async () => {
                try {
                    const lista = await planoService.listarTodos();
                    setPlanos(lista.filter(p => p.ativo));
                } catch (error) {
                    console.error("Erro ao carregar planos", error);
                }
            };
            carregarPlanos();
        }
    }, [isOpen]);

    const handleTrocar = async () => {
        if (!planoSelecionado) {
            alert("Selecione um novo plano");
            return;
        }

        setLoading(true);
        try {
            debugger
            await trocarPlanoAluno(alunoId, Number(planoSelecionado));
            dispatch(invalidateDashboard());
            alert("Plano alterado com sucesso!");
            onSuccess();
            onClose();
        } catch (error) {
            alert("Erro ao trocar plano");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md p-8 rounded-sm space-y-6">
                <div>
                    <h2 className="text-sm font-bold text-orange-500 uppercase tracking-[0.3em] mb-1">
                        Alterar Plano
                    </h2>
                    <p className="text-neutral-500 text-xs">Selecione o novo plano para o aluno. O plano anterior será invalidado.</p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest">
                            Novo Plano
                        </label>
                        <select
                            value={planoSelecionado}
                            onChange={(e) => setPlanoSelecionado(e.target.value ? Number(e.target.value) : "")}
                            className="w-full bg-neutral-800 border border-neutral-700 text-white p-3 text-sm focus:outline-none focus:border-orange-500 transition-colors rounded-sm"
                        >
                            <option value="">Selecione um plano</option>
                            {planos.map((p) => (
                                <option key={p.id} value={p.id} disabled={p.id === planoAtualId}>
                                    {p.descricao} - R$ {p.valor} ({p.duracao} dias) {p.id === planoAtualId ? "(Atual)" : ""}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-neutral-700 text-white py-3 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleTrocar}
                        disabled={loading}
                        className="flex-1 bg-white text-black py-3 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50"
                    >
                        {loading ? "Processando..." : "Confirmar Troca"}
                    </button>
                </div>
            </div>
        </div>
    );
}
