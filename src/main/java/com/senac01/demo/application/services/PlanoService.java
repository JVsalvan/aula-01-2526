package com.senac01.demo.application.services;

import com.senac01.demo.application.DTO.PlanoRequest;
import com.senac01.demo.application.DTO.PlanoResponse;
import com.senac01.demo.domain.entites.Plano;
import com.senac01.demo.domain.entites.Usuario;
import com.senac01.demo.domain.repository.PlanoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanoService {

    @Autowired
    private PlanoRepository planoRepository;

    public PlanoResponse salvar(PlanoRequest request) {
        try {
            var usuario = buscarUsuario();
            if (usuario == null) {
                throw new RuntimeException("Sem usuario logado!");
            }
            var plano = planoRepository.save(new Plano(request, usuario));
            return new PlanoResponse(plano);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Plano buscarPorId(Long id) {
        var usuario = buscarUsuario();
        if (usuario == null) {
            throw new RuntimeException("Sem usuario logado!");
        }
        return planoRepository.findByIdAndUsuario_Id(id, usuario.getId()).orElseThrow(()-> new RuntimeException("Plano não encontrado!"));
    }

    public List<PlanoResponse> listarTodos() {
        var usuario = buscarUsuario();

        if (usuario != null && !usuario.getRole().equals("ROLE_ADMIN")) {
            List<PlanoResponse> planos = planoRepository.findAllByUsuario_Id(usuario.getId())
                    .stream()
                    .map(PlanoResponse::new)
                    .toList();

            return planos;
        }

        return planoRepository.findAll().stream().map(PlanoResponse::new).toList();
    }

    public boolean atualizar(Long id, PlanoRequest request) {
        var usuario = buscarUsuario();
        if (usuario == null) {
            return false;
        }
        var plano = planoRepository.findByIdAndUsuario_Id(id, usuario.getId()).orElse(null);
        if (plano != null) {
            plano.setDescricao(request.descricao());
            plano.setValor(request.valor());
            plano.setDiasValidade(request.duracao());
            planoRepository.save(plano);
            return true;
        }
        return false;
    }

    public boolean alterarAtivo(Long id) {
        var usuario = buscarUsuario();
        if (usuario == null) {
            return false;
        }
        var plano = planoRepository.findByIdAndUsuario_Id(id, usuario.getId()).orElse(null);
        if (plano != null) {
            plano.setAtivo(!plano.isAtivo());
            planoRepository.save(plano);
            return true;
        }
        return false;
    }

    private Usuario buscarUsuario() {
        return (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
