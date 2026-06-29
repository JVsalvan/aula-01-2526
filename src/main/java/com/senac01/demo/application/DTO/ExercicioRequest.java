package com.senac01.demo.application.DTO;

public record ExercicioRequest(
    String nome,
    String series,
    String repeticoes,
    String descanso
) {
}
