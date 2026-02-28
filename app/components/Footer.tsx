export default function Footer(){

const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-950 border-t border-orange-600/30 py-10 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Copyright Section */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <p className="text-zinc-500 text-sm font-medium tracking-wide">
            {currentYear} <span className="text-orange-500 font-black italic tracking-tighter">PAWERFIT</span>. 
            Todos os direitos reservados.
          </p>
        </div>

        {/* Links Section com <a> e href="#" */}
        <nav className="flex flex-wrap justify-center items-center gap-8 order-1 md:order-2">
          <a 
            href="#" 
            className="group flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors duration-300"
          >
            {/* SVG W3.ORG - Suporte/Chat */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-orange-500 transition-colors">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest">Suporte</span>
          </a>

          <a 
            href="#" 
            className="group flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors duration-300"
          >
            {/* SVG W3.ORG - Documento/Termos */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-orange-500 transition-colors">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest">Termos de Uso</span>
          </a>
        </nav>

      </div>
    </footer>
  );
}