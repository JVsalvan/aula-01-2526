package com.senac01.demo.application.DTO;

import com.senac01.demo.domain.entites.Aluno;

public record AlunoResponse(

            Long id,
            String nome,
            String cpf,
            String telefone,
            String email,
            String status

    ) {

        public AlunoResponse(Aluno aluno) {

            this(
                    aluno.getId(),
                    aluno.getNome(),
                    aluno.getCpf(),
                    aluno.getTelefone(),
                    aluno.getEmail(),
                    aluno.getStatus().toString()
            );
        }
    }

