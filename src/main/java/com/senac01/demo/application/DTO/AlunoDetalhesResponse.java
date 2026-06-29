package com.senac01.demo.application.DTO;

import com.senac01.demo.domain.entites.Aluno;
import com.senac01.demo.domain.entites.AlunoPlano;
import com.senac01.demo.domain.entites.Plano;

import com.senac01.demo.domain.entites.FichaTreino;
import java.util.List;
import java.util.stream.Collectors;

public record AlunoDetalhesResponse(
        Long id,
        String nome,
        String cpf,
        String telefone,
        String status,
        AlunoPlanoResponse plano,
        List<FichaTreinoResponse> fichasTreino
) {
    public AlunoDetalhesResponse(Aluno aluno, AlunoPlano alunoPlano, Plano plano, List<FichaTreino> fichas){
        this(
                aluno.getId(),
                aluno.getNome(),
                aluno.getCpf().toString(),
                aluno.getTelefone(),
                aluno.getStatus().toString(),
                alunoPlano != null ? new AlunoPlanoResponse(alunoPlano, plano) : null,
                fichas.stream().map(FichaTreinoResponse::new).collect(Collectors.toList())
        );
    }
}
