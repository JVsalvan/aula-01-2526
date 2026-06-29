package com.senac01.demo.application.DTO;

import com.senac01.demo.domain.entites.Usuario;

public record UsuarioLogadoResponse(
        String nome,
        String role
) {
    public UsuarioLogadoResponse(Usuario usuario) {
        this(
                usuario.getNome(),
                usuario.getRole()
        );
    }
}
