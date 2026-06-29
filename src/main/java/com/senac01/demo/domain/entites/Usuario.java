package com.senac01.demo.domain.entites;


import com.senac01.demo.application.DTO.UsuarioAdmRequest;
import com.senac01.demo.application.DTO.UsuarioRequest;
import com.senac01.demo.domain.enums.EnumStatusUsuario;
import com.senac01.demo.domain.valueobject.CREF;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String email;

    private String senha;

    private CREF cref;

    private String role;

    private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;


    public Usuario(UsuarioRequest usuario) {
        this.email =usuario.email();
        this.nome = usuario.nome();
        this.senha = usuario.senha();
        this.cref = new CREF(usuario.cref());
        this.role = "ROLE_USER";
    }

    public Usuario(UsuarioAdmRequest usuario) {
        this.email =usuario.email();
        this.nome = usuario.nome();
        this.senha = usuario.senha();
        this.role = "ROLE_ADMIN";
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role));
    }

    @Override
    public @Nullable String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return  this.email;
    }
}



