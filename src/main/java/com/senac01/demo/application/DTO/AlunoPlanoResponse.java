package com.senac01.demo.application.DTO;

import com.senac01.demo.domain.entites.AlunoPlano;
import com.senac01.demo.domain.entites.Plano;
import com.senac01.demo.domain.enums.EnumStatusAlunoPlano;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public record AlunoPlanoResponse(
        PlanoResponse plano,
        LocalDateTime dataAdesao,
        LocalDateTime dataExpiracao,
        EnumStatusAlunoPlano status,
        boolean proximoVencimento
) {
    public AlunoPlanoResponse(AlunoPlano alunoPlano, Plano plano){
        this(
                new PlanoResponse(plano),
                alunoPlano.getDataInicio(),
                alunoPlano.getDataExpiracao(),
                alunoPlano.getStatus(),
                alunoPlano.getDataExpiracao() != null && 
                ChronoUnit.DAYS.between(LocalDateTime.now(), alunoPlano.getDataExpiracao()) <= 5
        );
    }
}
