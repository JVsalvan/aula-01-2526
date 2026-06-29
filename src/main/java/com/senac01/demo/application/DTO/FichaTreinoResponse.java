package com.senac01.demo.application.DTO;

import com.senac01.demo.domain.entites.FichaTreino;
import java.util.List;
import java.util.stream.Collectors;

public record FichaTreinoResponse(
    Long id,
    String objetivo,
    List<ExercicioResponse> exercicios
) {
    public FichaTreinoResponse(FichaTreino fichaTreino) {
        this(
            fichaTreino.getId(),
            fichaTreino.getObjetivo(),
            fichaTreino.getExercicios().stream().map(ExercicioResponse::new).collect(Collectors.toList())
        );
    }
}
