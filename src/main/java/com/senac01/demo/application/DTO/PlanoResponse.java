package com.senac01.demo.application.DTO;

import com.senac01.demo.domain.entites.Plano;

import java.math.BigDecimal;

public record PlanoResponse(
        Long id,
        String descricao,
        BigDecimal valor,
        long diasValidade,
        boolean ativo
) {
    public PlanoResponse(Plano plano) {
        this (
                plano.getId(),
                plano.getDescricao(),
                plano.getValor(),
                plano.getDiasValidade(),
                plano.isAtivo()
        );
    }
}
