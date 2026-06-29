package com.senac01.demo.application.DTO;

import java.time.LocalDate;

public record AlunoRequest(
        String nome,
        String telefone,
        String cpf,
        LocalDate dataNascimento,
        Long planoId
) {
}
