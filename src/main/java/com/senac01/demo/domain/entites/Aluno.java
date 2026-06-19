package com.senac01.demo.domain.entites;

import com.senac01.demo.domain.enums.EnumStatusUsuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

        private String cpf;

        private String telefone;

        private String email;

        private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;
    }

