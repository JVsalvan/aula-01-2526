"use client"
import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"
import SidebarAcademia from "@/app/components/Sidebar" // Importe sua Sidebar aqui
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/dist/client/components/navigation";

export default function SistemaLayout({
    children
}: {
    children: React.ReactNode
}) {

    const usuario = useSelector(
        (state: RootState) => state.auth.usuario
    );

    const router = useRouter();

    useEffect(() => {

        if (usuario == null) {

            router.push("/login");
        }

    });

    if (usuario == null) return null;

    return (
        /* Mudamos para flex-row para a Sidebar ficar ao lado do conteúdo */
        <div className="flex min-h-screen flex-row bg-neutral-950">

            {/* 1. Sidebar fixa na esquerda */}
            <SidebarAcademia role={usuario.role} />

            {/* 2. Lado direito: Todo o conteúdo do sistema */}
            <div className="flex flex-1 flex-col">

                {/* Header no topo */}
                <Header usuarioLogado={usuario} />

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