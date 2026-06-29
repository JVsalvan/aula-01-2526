package com.senac01.demo.domain.entites;

import com.senac01.demo.application.DTO.PlanoRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "plano")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Plano {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;
    private BigDecimal valor;
    private long diasValidade;

    private boolean ativo = true;

    @ManyToOne
    @JoinColumn(name = "usuario_id",referencedColumnName = "id")
    private Usuario usuario;

    public Plano(PlanoRequest planoRequest, Usuario usuario){
        this.descricao = planoRequest.descricao();
        this.valor = planoRequest.valor();
        this.diasValidade = planoRequest.duracao();
        this.usuario = usuario;
    }

}
