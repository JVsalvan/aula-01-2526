package com.senac01.demo.application.DTO;

import com.senac01.demo.domain.entites.Aluno;

public record AlunoResponse(

            Long id,
            String nome,
            String cpf,
            String telefone,
            String status

    ) {

        public AlunoResponse(Aluno aluno) {

            this(
                    aluno.getId(),
                    aluno.getNome(),
                    aluno.getCpf().toString(),
                    aluno.getTelefone(),
                    aluno.getStatus().toString()
            );
        }
    }

