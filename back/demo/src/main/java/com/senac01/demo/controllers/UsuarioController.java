package com.senac01.demo.controllers;


import com.senac01.demo.model.DTO.AlterarStatusRequest;
import com.senac01.demo.model.entites.Usuario;
import com.senac01.demo.model.repository.UsuarioRepository;
import com.senac01.demo.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @GetMapping
    public ResponseEntity<List<?>> listarTodos() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioRepository.findById(id).orElse(null));

    }


    @PostMapping
    public ResponseEntity<Long> salvar(@RequestBody Usuario usuario) {

        return ResponseEntity.ok(usuarioRepository.save(usuario).getId());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody Usuario usuario) {
        var alterarUsuarioResult = usuarioService.AltetarUsuario(id,usuario);

        return ResponseEntity.notFound().build();


    }
    @PutMapping("/{id}/AlterarStatus")
    public ResponseEntity<?> AlterarSTatus(@PathVariable Long id, @RequestBody AlterarStatusRequest statusRequest) {

        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco != null) {
            usuarioBanco.setStatus(statusRequest.status());
            usuarioRepository.save(usuarioBanco);
            return ResponseEntity.ok("Atualizado com sucesso!!");
        }

        return ResponseEntity.notFound().build();


    }

}
