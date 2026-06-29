
'use client'

import React, { useState } from 'react'
import { ExercicioRequest, FichaTreinoRequest } from '@/app/types/alunos'
import { salvarFichaTreino } from '@/app/services/fichaTreinoService'

interface ModalFichaTreinoProps {
    alunoId: number
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export default function ModalFichaTreino({ alunoId, isOpen, onClose, onSuccess }: ModalFichaTreinoProps) {
    const [objetivo, setObjetivo] = useState('')
    const [exercicios, setExercicios] = useState<ExercicioRequest[]>([
        { nome: '', series: '', repeticoes: '', descanso: '' }
    ])
    const [loading, setLoading] = useState(false)

    if (!isOpen) return null

    const handleAddExercicio = () => {
        setExercicios([...exercicios, { nome: '', series: '', repeticoes: '', descanso: '' }])
    }

    const handleRemoveExercicio = (index: number) => {
        if (exercicios.length > 1) {
            setExercicios(exercicios.filter((_, i) => i !== index))
        }
    }

    const handleExercicioChange = (index: number, field: keyof ExercicioRequest, value: string) => {
        const newExercicios = [...exercicios]
        newExercicios[index][field] = value
        setExercicios(newExercicios)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const request: FichaTreinoRequest = {
                alunoId,
                objetivo,
                exercicios: exercicios.filter(ex => ex.nome.trim() !== '')
            }

            if (request.exercicios.length === 0) {
                alert("Adicione pelo menos um exercício.")
                setLoading(false)
                return
            }

            await salvarFichaTreino(request)
            onSuccess()
            onClose()
            setObjetivo('')
            setExercicios([{ nome: '', series: '', repeticoes: '', descanso: '' }])
        } catch (error) {
            console.error(error)
            alert("Erro ao salvar ficha de treino")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-neutral-950 border border-neutral-800 rounded-sm p-8 w-full max-w-4xl shadow-2xl my-8">
                <div className="flex justify-between items-center mb-8 border-b border-neutral-800 pb-4">
                    <h2 className="text-white font-black uppercase text-xl tracking-widest">
                        Nova <span className="text-orange-500">Ficha de Treino</span>
                    </h2>
                    <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">Objetivo do Treino</label>
                        <input
                            type="text"
                            required
                            value={objetivo}
                            onChange={e => setObjetivo(e.target.value)}
                            className="bg-neutral-900 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm focus:border-orange-500 outline-none transition-colors"
                            placeholder="Ex: Hipertrofia, Emagrecimento..."
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-white font-bold uppercase text-[10px] tracking-widest">Exercícios</h3>
                            <button
                                type="button"
                                onClick={handleAddExercicio}
                                className="text-orange-500 border border-orange-500/30 px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all"
                            >
                                + Adicionar Exercício
                            </button>
                        </div>

                        <div className="space-y-4">
                            {exercicios.map((ex, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-neutral-900/40 p-4 border border-neutral-800 rounded-sm relative group">
                                    <div className="md:col-span-5 flex flex-col gap-2">
                                        <label className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Nome do Exercício</label>
                                        <input
                                            type="text"
                                            required
                                            value={ex.nome}
                                            onChange={e => handleExercicioChange(index, 'nome', e.target.value)}
                                            className="bg-neutral-950 border border-neutral-800 text-white text-xs px-3 py-2 rounded-sm focus:border-orange-500 outline-none"
                                            placeholder="Ex: Supino Reto"
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex flex-col gap-2">
                                        <label className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Séries</label>
                                        <input
                                            type="text"
                                            required
                                            value={ex.series}
                                            onChange={e => handleExercicioChange(index, 'series', e.target.value)}
                                            className="bg-neutral-950 border border-neutral-800 text-white text-xs px-3 py-2 rounded-sm focus:border-orange-500 outline-none"
                                            placeholder="Ex: 4"
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex flex-col gap-2">
                                        <label className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Repetições</label>
                                        <input
                                            type="text"
                                            required
                                            value={ex.repeticoes}
                                            onChange={e => handleExercicioChange(index, 'repeticoes', e.target.value)}
                                            className="bg-neutral-950 border border-neutral-800 text-white text-xs px-3 py-2 rounded-sm focus:border-orange-500 outline-none"
                                            placeholder="Ex: 12-15"
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex flex-col gap-2">
                                        <label className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Descanso</label>
                                        <input
                                            type="text"
                                            required
                                            value={ex.descanso}
                                            onChange={e => handleExercicioChange(index, 'descanso', e.target.value)}
                                            className="bg-neutral-950 border border-neutral-800 text-white text-xs px-3 py-2 rounded-sm focus:border-orange-500 outline-none"
                                            placeholder="Ex: 60s"
                                        />
                                    </div>
                                    <div className="md:col-span-1 flex items-end justify-center pb-1">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExercicio(index)}
                                            className="text-neutral-700 hover:text-red-500 transition-colors p-1"
                                            title="Remover Exercício"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t border-neutral-800">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-neutral-500 font-black text-xs uppercase tracking-[0.2em] hover:text-white transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-orange-500 text-white px-10 py-3 rounded-sm font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-600 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {loading ? 'Salvando...' : 'Salvar Ficha'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
