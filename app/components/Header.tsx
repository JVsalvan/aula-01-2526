export default function Header(){
return (
    <header className="w-full bg-neutral-950 border-b-2 border-orange-600 px-4 py-3 sm:px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-8 h-8 text-orange-500"
          >
            <path d="m6.5 6.5 11 11" />
            <path d="m11.5 4.5 8 8" />
            <path d="m4.5 11.5 8 8" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
          </svg>
          <h1 className="text-white font-black text-2xl tracking-tighter italic">
            FIT<span className="text-orange-600 font-light">MANAGER</span>
          </h1>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-zinc-100 text-sm font-bold leading-none">João Salvan</p>
              <span className="text-orange-500 text-[10px] font-semibold tracking-widest uppercase">Admin</span>
            </div>
            
            {/* Avatar Icon SVG */}
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden hover:border-orange-500 transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6 text-zinc-400"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>

          <button 
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-black font-bold py-2 px-4 rounded-md transition-all active:scale-95 group"
          >
            <span className="hidden sm:inline text-sm">SAIR</span>
            {/* Logout Icon SVG */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
}