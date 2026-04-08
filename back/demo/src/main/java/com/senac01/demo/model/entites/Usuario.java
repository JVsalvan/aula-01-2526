package com.senac01.demo.model.entites;


import com.senac01.demo.model.enums.EnumStatusUsuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String senha;

    private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;


}