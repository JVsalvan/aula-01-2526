package com.senac01.demo.application.DTO;

import com.senac01.demo.domain.entites.Usuario;

public record UsuarioResponse (


     Long id,

     String name,

     String email,

     String senha,

     String status
) {
    public UsuarioResponse(Usuario usuario){
            this(
                    usuario.getId(),
                    usuario.getNome(),
                    usuario.getEmail(),
                    usuario.getSenha(),
                    usuario.getStatus().toString()
            );
        }
}
