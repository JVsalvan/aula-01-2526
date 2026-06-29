package com.senac01.demo.application.DTO;

import java.time.LocalDateTime;

public record AlunoProximoVencimentoResponse(
        Long id,
        String nome,
        LocalDateTime dataExpiracao,
        Long diasRestantes
) {
}
