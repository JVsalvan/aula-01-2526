'use client'

import { useRouter } from "next/navigation";
import { useAuth, Usuario } from "@/app/context/AuthContext"; // Ajuste o caminho
import { useTransition } from "react";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [isPending, startTransition] = useTransition();

    // No React 19, actions podem ser passadas diretamente para o 'action' do form
    const handleLoginAction = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const senha = formData.get("senha") as string; // Corrigido para bater com o name="senha"

        // Usamos startTransition para que o React saiba que isso é uma mudança de estado de UI
        startTransition(async () => {
            try {
                // Simulação de delay de rede
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Corrigido para bater com o seu construtor da classe Usuario
                // Supondo: new Usuario(codigo, name, cpf?, ativo?)
                const usuarioMock = new Usuario (1, "Professor joao","0000",true)
                const tokenMock = "jwt-sample-token-123";

                login(usuarioMock, tokenMock);
                
                console.log(`Autenticado: ${email}`);
                router.push("/home");

            } catch (error) {
                alert("Erro ao entrar no sistema");
                console.error(error);
            }
        });
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-neutral-200">
            <div className="w-full max-w-md space-y-8">

                <header className="text-center space-y-2">
                    <h1 className="text-xs font-bold text-orange-500 uppercase tracking-[0.3em]">
                        Acesso Restrito
                    </h1>
                    <h2 className="text-4xl font-light text-white tracking-tight italic">
                        Entrar
                    </h2>
                </header>

                <div className="border border-neutral-800 bg-neutral-900/20 p-8 rounded-sm backdrop-blur-sm">
                    {/* AQUI ESTÁ A CORREÇÃO: Passamos a função diretamente */}
                    <form action={handleLoginAction} className="space-y-6">

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest block">
                                E-mail
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="seu@email.com"
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-4 py-3 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-orange-500 transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest block">
                                    Senha
                                </label>
                                <a href="#" className="text-[9px] text-neutral-600 hover:text-orange-500 uppercase font-bold tracking-tighter transition-colors">
                                    Esqueceu?
                                </a>
                            </div>
                            <input
                                name="senha"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-4 py-3 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-orange-500 transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-white text-black py-3 rounded-sm font-bold text-xs uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Autenticando..." : "Acessar Sistema"}
                        </button>
                    </form>
                </div>

                <footer className="text-center">
                    <p className="text-[10px] font-medium text-neutral-700 uppercase tracking-[0.5em]">
                        FitManager © 2026
                    </p>
                </footer>
            </div>
        </div>
    );
}