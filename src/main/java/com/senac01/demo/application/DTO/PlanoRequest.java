package com.senac01.demo.application.DTO;

import java.math.BigDecimal;

public record PlanoRequest(
        String descricao,
        BigDecimal valor,
        long duracao
) {
}
