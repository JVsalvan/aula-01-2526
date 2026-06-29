
"use client"
import { useParams, useRouter } from "next/navigation";
import AlunoForm from "../../components/AlunoForms";
import { buscarAlunoPorId } from "@/app/services/alunoService";
import { useEffect, useState } from "react";
import { Aluno } from "@/app/types/alunos";



export default function EditarAluno() {

    const params = useParams();
    const router = useRouter()

    const id = params.id;

    const [aluno, setAluno] = useState<Aluno | null>(null)

    const buscarAluno = async () => {
        try {
            setAluno(await buscarAlunoPorId(Number(id)))
        } catch (error) {
            alert(error)
        }
    }

    useEffect(()=>{
        buscarAluno();
    }, [aluno])

    if (!aluno) return <div>Carregando</div>

    if(aluno === null) router.push("/alunos")

    return (
        <AlunoForm
            alunoExistente={aluno!}
        />
    );
}