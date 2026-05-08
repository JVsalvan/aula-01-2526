package com.senac01.demo.application.services;

import com.senac01.demo.application.DTO.LoginRequest;
import com.senac01.demo.application.DTO.UsuarioResponse;
import com.senac01.demo.domain.entites.Usuario;
import com.senac01.demo.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;



    public boolean AterarUsuario(Long id, Usuario usuario) {

        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco != null){
            usuarioBanco.setEmail(usuario.getEmail());
            usuarioBanco.setName(usuario.getName());
            usuarioBanco.setSenha(usuario.getSenha());
            usuarioBanco.setStatus(usuario.getStatus());


            usuarioRepository.save(usuarioBanco);

            return true;
        }

        return false;
    }
    @Autowired
    private UsuarioRepository UsuarioRepository;


    public boolean ValidaUsuarioSenha(LoginRequest loginRequest) {
        try {

            return usuarioRepository.existsUsuarioByEmailContainingAndSenha(loginRequest.email(), loginRequest.senha());

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public List<UsuarioResponse> ListarTodos() {

        try {
            return usuarioRepository.findAll()
                    .stream()
                    .map(UsuarioResponse::new)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public UsuarioResponse BuscarUsuarioPorId(Long id) {
        try {
            var usuario = usuarioRepository.findById(id).orElse(null);
            return new UsuarioResponse(usuario);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }



    public Usuario BuscarUsuarioLogado(Usuario usuario) {

        try{
            return   usuarioRepository.findById(usuario.getId()).orElse(null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
