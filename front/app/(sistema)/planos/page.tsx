'use client'

import React, { useEffect, useState } from 'react'
import { planoService } from '../../services/planoService'
import { Plano, PlanoRequest } from '../../types/alunos'

export default function PlanosPage() {
    const [planos, setPlanos] = useState<Plano[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingPlano, setEditingPlano] = useState<Plano | null>(null)
    const [formData, setFormData] = useState<PlanoRequest>({
        descricao: '',
        valor: 0,
        duracao: 30
    })

    

    async function carregarPlanos() {
        try {
            const data = await planoService.listarTodos()
            setPlanos(data)
        } catch (error) {
            console.error("Erro ao carregar planos", error)
        } finally {
            setLoading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            if (editingPlano) {
                await planoService.atualizar(editingPlano.id, formData)
            } else {
                await planoService.salvar(formData)
            }
            setIsModalOpen(false)
            setEditingPlano(null)
            setFormData({ descricao: '', valor: 0, duracao: 30 })
            carregarPlanos()
        } catch (error) {
            alert("Erro ao salvar plano")
        }
    }

    async function handleToggleStatus(id: number) {
        try {
            await planoService.alterarStatus(id)
            carregarPlanos()
        } catch (error) {
            alert("Erro ao alterar status")
        }
    }

    useEffect(() => {
        carregarPlanos()
    }, [])

    function openEditModal(plano: Plano) {
        setEditingPlano(plano)
        setFormData({
            descricao: plano.descricao,
            valor: plano.valor,
            duracao: plano.diasValidade
        })
        setIsModalOpen(true)
    }

    console.log(planos)

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-white font-black uppercase text-2xl tracking-widest">
                        Gestão de <span className="text-orange-500">Planos</span>
                    </h1>
                    <p className="text-neutral-500 text-xs uppercase font-bold tracking-[0.2em] mt-1">
                        Configure os planos de assinatura da academia
                    </p>
                </div>
                <button 
                    onClick={() => {
                        setEditingPlano(null)
                        setFormData({ descricao: '', valor: 0, duracao: 30 })
                        setIsModalOpen(true)
                    }}
                    className="bg-orange-500 text-white px-6 py-3 rounded-sm font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-600 transition-all active:scale-95"
                >
                    Novo Plano
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
            ) : (
                <div className="bg-neutral-900/40 border border-neutral-800 rounded-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-neutral-800">
                        <thead>
                            <tr className="bg-neutral-900">
                                <th className="px-6 py-4 text-left text-[10px] font-black text-neutral-500 uppercase tracking-widest">Descrição</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-neutral-500 uppercase tracking-widest">Valor</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-neutral-500 uppercase tracking-widest">Validade</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-neutral-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-right text-[10px] font-black text-neutral-500 uppercase tracking-widest">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {planos.map((plano) => (
                                <tr key={plano.id} className="hover:bg-neutral-800/30 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300 font-medium">{plano.descricao}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-500 font-bold">R$ {plano.valor.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{plano.diasValidade} dias</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${plano.ativo ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {plano.ativo ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-bold uppercase tracking-widest">
                                        <button onClick={() => openEditModal(plano)} className="text-blue-500 hover:text-blue-400 mr-4 transition-colors">Editar</button>
                                        <button 
                                            onClick={() => handleToggleStatus(plano.id)} 
                                            className={`${plano.ativo ? 'text-red-500 hover:text-red-400' : 'text-green-500 hover:text-green-400'} transition-colors`}
                                        >
                                            {plano.ativo ? 'Desativar' : 'Ativar'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-neutral-950 border border-neutral-800 rounded-sm p-8 w-full max-w-md shadow-2xl">
                        <h2 className="text-white font-black uppercase text-xl tracking-widest mb-6">
                            {editingPlano ? 'Editar' : 'Novo'} <span className="text-orange-500">Plano</span>
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">Descrição</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={formData.descricao}
                                        onChange={e => setFormData({...formData, descricao: e.target.value})}
                                        className="bg-neutral-900 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm focus:border-orange-500 outline-none transition-colors" 
                                        placeholder="Ex: Plano Mensal"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">Valor (R$)</label>
                                    <input 
                                        type="number" 
                                        step="0.01" 
                                        required 
                                        value={formData.valor}
                                        onChange={e => setFormData({...formData, valor: parseFloat(e.target.value)})}
                                        className="bg-neutral-900 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm focus:border-orange-500 outline-none transition-colors"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">Duração (dias)</label>
                                    <input 
                                        type="number" 
                                        required 
                                        value={formData.duracao}
                                        onChange={e => setFormData({...formData, duracao: parseInt(e.target.value)})}
                                        className="bg-neutral-900 border border-neutral-800 text-white text-sm px-4 py-3 rounded-sm focus:border-orange-500 outline-none transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4 pt-4">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 text-neutral-500 font-black text-xs uppercase tracking-[0.2em] hover:text-white transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-orange-500 text-white px-8 py-3 rounded-sm font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-600 transition-all active:scale-95"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
