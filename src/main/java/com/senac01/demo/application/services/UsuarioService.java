package com.senac01.demo.application.services;

import com.senac01.demo.application.DTO.*;
import com.senac01.demo.domain.entites.Usuario;
import com.senac01.demo.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Value("${spring.secretkey}")
    private String secret;

    public boolean AterarUsuario(Long id, Usuario usuario) {

        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco != null) {
            usuarioBanco.setEmail(usuario.getEmail());
            usuarioBanco.setNome(usuario.getNome());
            usuarioBanco.setSenha(usuario.getSenha());
            usuarioBanco.setStatus(usuario.getStatus());

            usuarioRepository.save(usuarioBanco);

            return true;
        }

        return false;
    }

    public boolean ValidaUsuarioSenha(LoginRequest loginRequest) {
        try {

            return usuarioRepository
                    .existsUsuarioByEmailContainingAndSenha(
                            loginRequest.email(),
                            loginRequest.senha()
                    );

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

    public UsuarioLogadoResponse BuscarUsuarioLogado(Usuario usuario) {

        try {
            return new UsuarioLogadoResponse(usuarioRepository.findById(usuario.getId()).orElse(null)) ;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Long SalvarUsuario(UsuarioRequest usuario) {

        try {
            return usuarioRepository.save(new Usuario(usuario)).getId();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Long SalvarUsuarioAdm(UsuarioAdmRequest usuario) {

        try {

            if (usuario.secretKey().equals(secret)) {
                return usuarioRepository.save(new Usuario(usuario)).getId();
            } else {
                return 0L;
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean AlterarStatusUsuario(Long id, AlterarStatusRequest statusRequest) {
        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco != null) {
            usuarioBanco.setStatus(statusRequest.status());

            usuarioRepository.save(usuarioBanco);

            return true;
        }

        return false;
    }
}