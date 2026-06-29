package com.senac01.demo.application.DTO;

import java.util.List;

public record DashboardResponse(
        long totalAlunos,
        long alunosPlanosAVencer,
        long alunosPlanosCancelados,
        List<AlunoProximoVencimentoResponse> alunosProximosVencimento
) {
}
