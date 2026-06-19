package com.senac01.demo.domain.entites;

import com.senac01.demo.domain.enums.EnumStatusAcademia;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "academia") // Nome da tabela no banco
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Academia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;
    
    @Enumerated(EnumType.STRING)
    private EnumStatusAcademia status = EnumStatusAcademia.ATIVO;


}