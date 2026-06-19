package com.senac01.demo.application.DTO;


public record UsuarioAdmRequest(
        String nome,
        String email,
        String senha,
        String secretKey
) {
}