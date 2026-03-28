'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import AcademiaForm, { Academia } from "../../componets/AcademiaForm"; // Ajuste o caminho se necessário


export default function EditarAcademia() {
    const params = useParams();
    const router = useRouter();
    
    // Pegamos o ID da URL. Certifique-se que o nome do arquivo na pasta é [id] ou [codigo]
    const id = Number(params.id || params.codigo); 

    const [academia, setAcademia] = useState<Academia | null>(null);

    useEffect(() => {
        if (id) {
            buscarDados();
        }
    }, [id]);

    const buscarDados = async () => {
        try {
            const response = await axios.get<Academia>(`http://localhost:8080/academia/${id}`);
            
            if (response.data) {
                setAcademia(response.data);
            } else {
                router.push("/academia");
            }
        } catch (error) {
            console.error("Erro ao buscar unidade:", error);
            alert("Erro ao carregar os dados da academia.");
            router.push("/academias");
        }
    };

    // Estilo de Loading seguindo o padrão visual do seu primeiro exemplo
    if (!academia) {
        return (
            <div className="p-20 text-center animate-pulse text-orange-500 font-black uppercase text-xs tracking-[0.5em]">
                Sincronizando Dados da Unidade...
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
            {/* CABEÇALHO DE EDIÇÃO */}
            <header className="border-b border-neutral-800 pb-8">
                <Link 
                    href="/academia" 
                    className="text-[10px] font-black text-neutral-600 hover:text-orange-500 uppercase tracking-widest mb-6 block w-fit transition-colors"
                >
                    ← Voltar para Listagem
                </Link>
                
                <h1 className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                    Console de Gerenciamento
                </h1>
                
                <h2 className="text-4xl font-light text-white italic">
                    Configurando: <span className="font-bold text-orange-500 underline decoration-1 underline-offset-8">
                        {academia.name}
                    </span>
                </h2>
                
                <p className="text-neutral-500 text-[10px] uppercase tracking-widest mt-4 font-mono">
                    ID do Registro: #{id}
                </p>
            </header>

            {/* FORMULÁRIO DE EDIÇÃO */}
            <div className="bg-neutral-900/10 p-2 rounded-sm border border-neutral-900/50">
                <AcademiaForm academiaExistente={academia} />
            </div>

            {/* RODAPÉ INFORMATIVO */}
            <footer className="pt-8 border-t border-neutral-900 text-center">
                <p className="text-neutral-700 text-[9px] uppercase tracking-widest">
                    As alterações realizadas aqui afetarão o acesso desta unidade ao sistema global.
                </p>
            </footer>
        </div>
    );
}