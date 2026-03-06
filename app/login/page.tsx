'use client'
import { useRouter } from "next/navigation";

export default function LoginPage() {


    const router  = useRouter();



    const handleLogin = async (formData: FormData) => {

        const email = formData.get("email");
        const senha = formData.get("senha");

        console.log(`Autenticas com email: ${email}`)

        router.push("/dashoboard")

    }
    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-neutral-200">
            <div className="w-full max-w-md space-y-8">

                {/* HEADER DO FORMULÁRIO */}
                <header className="text-center space-y-2">
                    <h1 className="text-xs font-bold text-orange-500 uppercase tracking-[0.3em]">
                        Acesso Restrito
                    </h1>
                    <h2 className="text-4xl font-light text-white tracking-tight italic">
                        Entrar
                    </h2>
                </header>

                {/* CARD DO FORMULÁRIO */}
                <div className="border border-neutral-800 bg-neutral-900/20 p-8 rounded-sm backdrop-blur-sm">
                    <form action={handleLogin} className="space-y-6">

                        {/* CAMPO E-MAIL */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest block">
                                E-mail
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="seu@email.com"
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-4 py-3 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-orange-500 transition-colors"
                            />
                        </div>

                        {/* CAMPO SENHA */}
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
                                placeholder="••••••••"
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-4 py-3 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-orange-500 transition-colors"
                            />
                        </div>

                        {/* BOTÃO DE ACESSO */}
                        <button
                            type="submit"
                            className="w-full bg-white text-black py-3 rounded-sm font-bold text-xs uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all duration-300 mt-4"
                        >
                            Acessar Sistema
                        </button>
                    </form>
                </div>

                {/* FOOTER DO LOGIN */}
                <footer className="text-center">
                    <p className="text-[10px] font-medium text-neutral-700 uppercase tracking-[0.5em]">
                        FitManager © 2026
                    </p>
                </footer>
            </div>
        </div>
    );
}