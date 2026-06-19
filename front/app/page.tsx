import Link from "next/link";

export default function Home() {

 
  return (
    <main className="flex-1 bg-neutral-950 text-white overflow-x-hidden">

      {/* 1. HERO SECTION - FOCO TOTAL EM MENSAGEM */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-20 text-center">
        {/* Efeito de Gradiente de Fundo Profundo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-600/20 via-neutral-950 to-neutral-950 -z-10" />

        <div className="max-w-5xl mx-auto space-y-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/5 text-orange-500 text-xs font-black tracking-[0.2em] uppercase mb-4">
            A Revolução na Gestão Fitness
          </div>

          <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]">
            A ÚLTIMA PLATAFORMA QUE SUA <span className="text-orange-500">ACADEMIA</span> VAI PRECISAR.
          </h2>

          <p className="text-zinc-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Gestão de alunos, treinos personalizados e controle financeiro em um só lugar.
            Desenvolvido para quem busca <span className="text-white font-bold text-orange-500">alta performance</span> nos negócios.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center pt-8">
            <button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-black font-black px-12 py-5 rounded-md transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(234,88,12,0.3)] uppercase tracking-widest text-sm">
              Agendar Demonstração Gratuita
            </button>
            <Link
              href="/login"
              className="w-full sm:w-auto border-2 border-zinc-800 hover:border-orange-500 px-12 py-5 rounded-md font-black transition-all uppercase tracking-widest text-sm text-center inline-block group"
            >
              <span className="group-hover:text-orange-500 transition-colors">
                Conhecer Funcionalidades
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* 2. STATS SECTION - PROVA DE VALOR */}
      <section className="border-y border-zinc-900 bg-black/50 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Academias", val: "+500" },
            { label: "Alunos Ativos", val: "+150k" },
            { label: "Treinos Criados", val: "+2M" },
            { label: "Retenção Média", val: "94%" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-black text-orange-500">{stat.val}</p>
              <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INFO/FEATURES SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

          {/* Feature 1 */}
          <div className="space-y-6 group">
            <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-xl group-hover:border-orange-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Prescrição Digital</h3>
            <p className="text-zinc-500 leading-relaxed">
              Crie treinos complexos em segundos com nossa biblioteca de +1000 exercícios em vídeo. O aluno acessa tudo pelo App oficial.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="space-y-6 group">
            <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-xl group-hover:border-orange-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Financeiro Blindado</h3>
            <p className="text-zinc-500 leading-relaxed">
              Automação de cobranças recorrentes via PIX e cartão. Reduza a inadimplência em até 40% com nosso sistema de réguas automáticas.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="space-y-6 group">
            <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-xl group-hover:border-orange-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">BI & Analytics</h3>
            <p className="text-zinc-500 leading-relaxed">
              Dashboards em tempo real sobre a saúde da sua academia. Saiba exatamente quem está prestes a evadir e tome decisões baseadas em dados.
            </p>
          </div>

        </div>
      </section>

      {/* 4. FINAL CTA SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-orange-600 rounded-3xl p-10 md:p-20 text-center space-y-8 relative overflow-hidden">
          {/* Elemento Decorativo */}
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="300" height="300" viewBox="0 0 24 24" fill="black"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-black uppercase italic tracking-tight leading-none">
            Pronto para levar sua academia <br />ao próximo nível?
          </h2>
          <p className="text-black/80 font-bold max-w-xl mx-auto">
            Junte-se a centenas de gestores que já transformaram seus resultados com o FitManager.
          </p>
          <button className="bg-black text-orange-500 font-black px-12 py-5 rounded-full hover:scale-105 transition-all shadow-2xl uppercase tracking-widest text-sm">
            Falar com um Especialista agora
          </button>
        </div>
      </section>

    </main>
  );
}
