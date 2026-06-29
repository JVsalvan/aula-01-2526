package com.senac01.demo.domain.entites;

import com.senac01.demo.domain.enums.EnumStatusAlunoPlano;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "aluno_plano")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlunoPlano {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "aluno_id",referencedColumnName = "id")
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "plano_id",referencedColumnName = "id")
    private Plano plano;

    private LocalDateTime dataInicio = LocalDateTime.now();
    private LocalDateTime dataExpiracao;
    private EnumStatusAlunoPlano status = EnumStatusAlunoPlano.ATIVO;

    public AlunoPlano(Aluno aluno, Plano plano){
        this.aluno = aluno;
        this.plano = plano;
        this.dataExpiracao = this.dataInicio.plusDays(plano.getDiasValidade());
    }

}
