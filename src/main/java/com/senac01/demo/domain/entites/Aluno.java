package com.senac01.demo.domain.entites;

import com.senac01.demo.application.DTO.AlunoRequest;
import com.senac01.demo.domain.enums.EnumStatusUsuario;
import com.senac01.demo.domain.valueobject.CPF;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
    @Table(name = "aluno")
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Aluno {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String nome;

        private CPF cpf;

        private String telefone;

        private LocalDate dataNascimento;

        private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;

        @ManyToOne
        @JoinColumn(name = "professor_id", referencedColumnName = "id")
        private Usuario professor;


        public Aluno(AlunoRequest aluno, Usuario professor) {
            this.nome = aluno.nome();
            this.cpf = new CPF(aluno.cpf());
            this.telefone = aluno.telefone();
            this.dataNascimento = aluno.dataNascimento();
            this.professor = professor;
        }
    }

