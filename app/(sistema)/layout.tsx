import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"
import SidebarAcademia from "@/app/components/Sidebar" // Importe sua Sidebar aqui

export default function SistemaLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        /* Mudamos para flex-row para a Sidebar ficar ao lado do conteúdo */
        <div className="flex min-h-screen flex-row bg-neutral-950">
            
            {/* 1. Sidebar fixa na esquerda */}
            <SidebarAcademia />

            {/* 2. Lado direito: Todo o conteúdo do sistema */}
            <div className="flex flex-1 flex-col">
                
                {/* Header no topo */}
                <Header />

                {/* Conteúdo Principal (Main) */}
                <main className="flex-1 flex flex-col items-center p-4 sm:p-10 overflow-y-auto">
                    <div className="w-full max-w-7xl">
                        {children}
                    </div>
                </main>

                {/* Footer no final */}
                <Footer />
            </div>

        </div>
    )
}