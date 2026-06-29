package com.senac01.demo.domain.entites;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "exercicio")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String series;
    private String repeticoes;
    private String descanso;

    @ManyToOne
    @JoinColumn(name = "ficha_treino_id", referencedColumnName = "id")
    private FichaTreino fichaTreino;
}
