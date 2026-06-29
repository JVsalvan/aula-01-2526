package com.senac01.demo.application.DTO;

import java.util.List;

public record FichaTreinoRequest(
    String objetivo,
    Long alunoId,
    List<ExercicioRequest> exercicios
) {
}
