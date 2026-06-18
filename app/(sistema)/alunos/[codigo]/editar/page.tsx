import { notFound } from "next/navigation";

import AlunoForm from "../../components/AlunoForms";

import { buscarAlunoPorId } from "@/app/services/alunoService";

interface Props {
    params: Promise<{
        id: string;
    }>
}

export default async function EditarAluno({
    params
}: Props) {

    const { id } = await params;

    const aluno = await buscarAlunoPorId(
        Number(id)
    );

    if (!aluno) {
        notFound();
    }

    return (
        <AlunoForm
            alunoExistente={aluno}
        />
    );
}