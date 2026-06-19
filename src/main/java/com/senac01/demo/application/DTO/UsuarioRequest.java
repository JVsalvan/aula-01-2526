package com.senac01.demo.application.DTO;


public record UsuarioRequest(
        String nome,
        String email,
        String senha
) {
}