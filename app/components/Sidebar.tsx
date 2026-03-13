"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
 
export default function Sidebar() {
const pathname = usePathname();
  const YEAR = new Date().getFullYear();

  const menuItems = [
    {
      group: "Gestão Operacional",
      items: [
        { label: 'Dashboard', href: '/dashoboard' },
        { label: 'Matrículas Ativas', href: '/usuarios' },
        { label: 'Planos & Vendas', href: '/planos' },
      ]
    },
    {
      group: "Performance",
      items: [
        { label: 'Fichas de Treino', href: '/treinos' },
        { label: 'Avaliação Física', href: '/avaliacoes' },
      ]
    }
  ];

  return (
    <aside className="w-64 min-h-screen bg-neutral-950 border-r border-neutral-900 flex flex-col shrink-0 font-sans">
      
      {/* --- LOGO: FOCO EM FORÇA E PERFORMANCE --- */}
      <div className="p-8">
        <div className="flex flex-col gap-1 mb-12">
          <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em]">
            Elite Management
          </span>
          <h1 className="text-white text-2xl font-light tracking-tighter italic">
            Fit<span className="font-bold text-orange-500 underline decoration-1 underline-offset-8">Manager</span>
          </h1>
        </div>

        {/* --- NAVEGAÇÃO DINÂMICA --- */}
        <nav className="space-y-12">
          {menuItems.map((section) => (
            <div key={section.group}>
              <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] mb-6 border-b border-neutral-900 pb-2">
                {section.group}
              </p>
              <ul className="space-y-5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.label}>
                      <Link 
                        href={item.href} 
                        className={`group flex items-center justify-between transition-all duration-300 ${
                          isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-200'
                        }`}
                      >
                        <span className={`text-xs font-bold uppercase tracking-widest ${
                          isActive ? 'italic' : 'group-hover:italic'
                        }`}>
                          {item.label}
                        </span>
                        
                        {/* Indicador de Seleção: Linha que cresce no hover ou fica fixa se ativo */}
                        <div className={`h-[1px] bg-orange-500 transition-all duration-300 ${
                          isActive ? 'w-6' : 'w-0 group-hover:w-4'
                        }`} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* --- FOOTER: STATUS DA UNIDADE --- */}
      <div className="mt-auto p-8">
        <div className="pt-6 border-t border-neutral-900">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <div className="absolute w-3 h-3 rounded-full bg-orange-500 animate-ping opacity-20" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-neutral-200 uppercase tracking-widest">
                Unidade Central
              </p>
              <p className="text-[9px] text-neutral-600 uppercase font-medium">
                Acesso Liberado
              </p>
            </div>
          </div>
          
          <p 
            suppressHydrationWarning 
            className="mt-6 text-[9px] font-medium text-neutral-800 uppercase tracking-[0.3em]"
          >
            © {YEAR} SYSTEM
          </p>
        </div>
      </div>
    </aside>
  );
}