"use client"
import { AppDispatch, RootState } from "@/app/redux/store";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardData, setLoading, setError } from "@/app/redux/slices/dashboardSlice";
import dashboardService from "@/app/services/dashboardService";
import Link from "next/link";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const currentYear = new Date().getFullYear();

  const usuarioLogado = useSelector(
    (state: RootState) => state.auth.usuario
  );

  const { data, loading, error, lastFetched } = useSelector(
    (state: RootState) => state.dashboard
  );

  const carregarDados = useCallback(async () => {
    if (data && lastFetched) return;

    dispatch(setLoading(true));
    try {
      const response = await dashboardService.getDashboard();
      dispatch(setDashboardData(response));
    } catch (err: any) {
      dispatch(setError(err.message || "Erro ao carregar dados"));
    }
  }, [data, lastFetched, dispatch]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  console.log(data)

  const isAdmin = usuarioLogado?.role === "ADMIN";

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="text-orange-500 font-bold animate-pulse">CARREGANDO...</div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 bg-neutral-950 min-h-screen text-neutral-200">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-800 pb-8">
          <div>
            <h1 className="text-sm font-bold text-orange-500 uppercase tracking-[0.3em] mb-2">
              Painel de Controle
            </h1>
            <h2 className="text-4xl font-light text-white tracking-tight">
              Olá, <span className="font-semibold text-orange-500">{usuarioLogado?.nome}</span>
            </h2>
          </div>

          <div className="flex gap-4">
            {isAdmin && (
              <Link href="/usuarios" className="border border-neutral-800 text-neutral-400 px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest hover:border-orange-500 hover:text-orange-500 transition-all">
                Gestão de Usuários
              </Link>
            )}
            <Link href="/alunos/novo" className="bg-white text-black px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-orange-500 transition-all">
              + Novo Aluno
            </Link>
          </div>
        </header>

        {/* MÉTRICAS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              label: "Total Alunos",
              value: data?.totalAlunos || 0,
              trend: "Gerenciados",
              color: "text-white"
            },
            {
              label: "Planos a Vencer",
              value: data?.alunosPlanosAVencer || 0,
              trend: "Alertas ativos",
              color: "text-orange-500"
            },
            {
              label: "Planos Cancelados",
              value: data?.alunosPlanosCancelados || 0,
              trend: "Total",
              color: "text-red-500"
            }
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                {stat.label}
              </p>
              <p className={`text-3xl font-light italic tracking-tighter ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-[10px] text-neutral-500/80 font-medium">
                {stat.trend}
              </p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-4">
          {/* ALUNOS PRÓXIMOS AO VENCIMENTO */}
          <section className="lg:col-span-12 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-white">
                Alertas de Vencimento (≤ 5 dias)
              </h3>
              <Link
                href="/alunos"
                className="text-[10px] text-neutral-500 hover:text-orange-500 transition-colors uppercase font-bold tracking-widest"
              >
                Ver Todos Alunos
              </Link>
            </div>

            <div className="w-full overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-neutral-600 border-b border-neutral-900">
                    <th className="pb-4 font-black uppercase text-[10px] tracking-widest">
                      Aluno
                    </th>
                    <th className="pb-4 font-black uppercase text-[10px] tracking-widest">
                      Data de Expiração
                    </th>
                    <th className="pb-4 font-black uppercase text-[10px] tracking-widest text-right">
                      Dias Restantes
                    </th>
                    <th className="pb-4 font-black uppercase text-[10px] tracking-widest text-right">
                      Ação
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-neutral-900">
                  {data?.alunosProximosVencimento && data.alunosProximosVencimento.length > 0 ? (
                    data.alunosProximosVencimento.map((aluno, i) => (
                      <tr
                        key={i}
                        className="group hover:bg-neutral-900/30 transition-colors"
                      >
                        <td className="py-4 font-medium text-neutral-200">
                          {aluno.nome}
                        </td>
                        <td className="py-4 text-neutral-500">
                          {new Date(aluno.dataExpiracao).toLocaleDateString()}
                        </td>
                        <td className="py-4 text-right">
                          <span className="text-[10px] font-bold uppercase tracking-tighter text-orange-500">
                            {aluno.diasRestantes} DIAS
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <Link
                            href={`/alunos/${aluno.id}`}
                            className="text-[10px] font-bold uppercase tracking-widest text-orange-500 hover:underline"
                          >
                            Ver Perfil
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-neutral-500 text-xs uppercase tracking-widest font-bold">
                        Nenhum alerta de vencimento para os próximos 5 dias
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <footer className="pt-20 text-center">
          <p className="text-[10px] font-medium text-neutral-700 uppercase tracking-[0.5em]">
            FitManager © {currentYear}
          </p>
        </footer>
      </div>
    </div>
  );
}

