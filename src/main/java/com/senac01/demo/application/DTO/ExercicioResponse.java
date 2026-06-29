package com.senac01.demo.application.DTO;

import com.senac01.demo.domain.entites.Exercicio;

public record ExercicioResponse(
    Long id,
    String nome,
    String series,
    String repeticoes,
    String descanso
) {
    public ExercicioResponse(Exercicio exercicio) {
        this(
            exercicio.getId(),
            exercicio.getNome(),
            exercicio.getSeries(),
            exercicio.getRepeticoes(),
            exercicio.getDescanso()
        );
    }
}
