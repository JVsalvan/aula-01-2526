'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import { Academia } from "@/app/types/academia";
import AcademiaForm from "../../componets/AcademiaForm";

export default function EditarAcademia() {

    const params = useParams();
    const router = useRouter();

    // Captura do ID
    const id = Number(params.id);

    const [academia, setAcademia] = useState<Academia | null>(null);

    useEffect(() => {

        if (!id) {
            router.push("/academias");
            return;
        }

        buscarDados();

    }, [id]);

    async function buscarDados() {

        try {

            const response = await axios.get<Academia>(
                `http://localhost:8080/academia/${id}`
            );

            setAcademia(response.data);

        } catch (error) {

            console.error("Erro ao buscar academia:", error);

            alert("Erro ao carregar academia");

            router.push("/academias");
        }
    }

    // Loading
    if (!academia) {
        return (
            <div className="p-10 text-center">
                Carregando...
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">

            <Link
                href="/academias"
                className="mb-4 inline-block"
            >
                ← Voltar
            </Link>

            <h1 className="text-2xl font-bold mb-6">
                Editar Academia
            </h1>

            <AcademiaForm academiaExistente={academia} />

        </div>
    );
}