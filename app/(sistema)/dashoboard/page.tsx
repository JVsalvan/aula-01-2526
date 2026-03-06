export default function(){


const currentYear = new Date().getFullYear();

  return (
    <div className="p-6 lg:p-10 bg-neutral-950 min-h-screen text-neutral-200">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* --- HEADER CLEAN --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-800 pb-8">
          <div>
            <h1 className="text-sm font-bold text-orange-500 uppercase tracking-[0.3em] mb-2">Painel de Controle</h1>
            <h2 className="text-4xl font-light text-white tracking-tight">
              Olá, <span className="font-semibold text-orange-500">João Salvan</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <button className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
              Configurações
            </button>
            <button className="bg-white text-black px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-orange-500 transition-all">
              + Novo Aluno
            </button>
          </div>
        </header>

        {/* --- MÉTRICAS SEM CARDS PESADOS --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: "Faturamento", value: "R$ 12.450", trend: "+12%" },
            { label: "Alunos Ativos", value: "148", trend: "Estável" },
            { label: "Novas Matrículas", value: "12", trend: "+4" },
            { label: "Taxa de Churn", value: "2.4%", trend: "-0.5%" },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-light text-white italic tracking-tighter">{stat.value}</p>
              <p className="text-[10px] text-orange-500/80 font-medium">{stat.trend}</p>
            </div>
          ))}
        </section>

        {/* --- CONTEÚDO PRINCIPAL EM GRID LIMPO --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-4">
          
          {/* Alertas de Vencimento (Foco na Regra de 5 Dias) */}
          <section className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-white">Alertas Próximos</h3>
              <span className="bg-orange-500 text-[10px] text-black px-2 py-0.5 font-bold">Urgente</span>
            </div>
            
            <div className="divide-y divide-neutral-900">
              {[
                { nome: "Bruno Silva", dias: 2 },
                { nome: "Carla Souza", dias: 5 },
              ].map((alert, i) => (
                <div key={i} className="py-4 flex items-center justify-between group cursor-pointer">
                  <span className="text-neutral-300 group-hover:text-orange-500 transition-colors font-medium">{alert.nome}</span>
                  <span className="text-[11px] font-mono text-neutral-500 italic">Vence em {alert.dias} dias</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tabela de Alunos Recentes */}
          <section className="lg:col-span-8 space-y-6">
             <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-white">Últimas Atualizações</h3>
              <a href="#" className="text-[10px] text-neutral-500 hover:text-orange-500 transition-colors uppercase font-bold tracking-widest">Ver Todos</a>
            </div>

            <div className="w-full overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-neutral-600 border-b border-neutral-900">
                    <th className="pb-4 font-black uppercase text-[10px] tracking-widest">Aluno</th>
                    <th className="pb-4 font-black uppercase text-[10px] tracking-widest">Plano</th>
                    <th className="pb-4 font-black uppercase text-[10px] tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {[
                    { nome: "Rafinha Tanajura", plano: "Bunda Infinita", status: "Treino de Gluteo Atualizado" },
                    { nome: "João Salvan", plano: "Mensal", status: "Pagamento Confirmado" },
                    { nome: "Ricardo Santos", plano: "Trimestral", status: "Nova Ficha" },
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-neutral-900/30 transition-colors">
                      <td className="py-4 font-medium text-neutral-200">{row.nome}</td>
                      <td className="py-4 text-neutral-500">{row.plano}</td>
                      <td className="py-4 text-right">
                        <span className="text-[10px] font-bold text-orange-500/60 group-hover:text-orange-500 uppercase tracking-tighter">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
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