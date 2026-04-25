package com.senac01.demo.services;

import com.senac01.demo.model.DTO.LoginRequest;
import com.senac01.demo.model.entites.Usuario;
import com.senac01.demo.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private com.senac01.demo.model.repository.UsuarioRepository usuarioRepository;


    public boolean ValidaUsuarioSenha(LoginRequest loginRequest) {
        try {

            return usuarioRepository.existsUsuarioByEmailContainingAndSenha(loginRequest.email(), loginRequest.senha());

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public boolean AltetarUsuario(Long id, Usuario usuario) {


        try {


            var usuarioBanco = usuarioRepository.findById(id).orElse(null);

            if (usuarioBanco != null) {

                usuarioBanco.setEmail(usuario.getEmail());
                usuarioBanco.setName(usuario.getName());
                usuarioBanco.setSenha(usuario.getSenha());
                usuarioBanco.setStatus(usuario.getStatus());

                usuarioRepository.save(usuarioBanco);


                return true;
            }
            return false;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }


    }
}
