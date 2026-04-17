"use client";

import { createContext, ReactNode, useContext, useState, useCallback } from "react";
import axios from "axios";
import { Academia } from "../(sistema)/academia/componets/AcademiaForm";

interface AcademiaContextType {
    academiaSelecionada: Academia | null;
    listaAcademias: Academia[];
    academiasEditadas: Academia[];
    loading: boolean;
    selecionarAcademia: (academia: Academia) => void;
    atualizarLista: () => Promise<void>;
    limparSelecao: () => void;
    setAcademiasEditadas: (academia: Academia) => void;
}

const AcademiaContext = createContext<AcademiaContextType | undefined>(undefined);

export function AcademiaProvider({ children }: { children: ReactNode }) {
    const [academiaSelecionada, setAcademiaSelecionada] = useState<Academia | null>(null);
    const [listaAcademias, setListaAcademias] = useState<Academia[]>([]);
    const [academiasEditadas, setAcademiasEditadasState] = useState<Academia[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const atualizarLista = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get<Academia[]>('http://localhost:8080/academia');
            setListaAcademias(response.data);
        } catch (error) {
            console.error("Erro ao buscar lista de academias no Context:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const setAcademiasEditadas = useCallback((academia: Academia) => {
        setAcademiasEditadasState((prev) => {
            const filtradas = prev.filter((item) => item.id !== academia.id);
            return [academia, ...filtradas];
        });
    }, []);

    const selecionarAcademia = (academia: Academia) => {
        setAcademiaSelecionada(academia);
    };

    const limparSelecao = () => {
        setAcademiaSelecionada(null);
    };

    return (
        <AcademiaContext.Provider 
            value={{ 
                academiaSelecionada, 
                listaAcademias, 
                academiasEditadas,
                loading, 
                selecionarAcademia, 
                atualizarLista, 
                limparSelecao,
                setAcademiasEditadas
            }}
        >
            {children}
        </AcademiaContext.Provider>
    );
}

export const useAcademia = () => {
    const context = useContext(AcademiaContext);
    if (!context) {
        throw new Error('useAcademia deve ser usado dentro de um AcademiaProvider');
    }
    return context;
};