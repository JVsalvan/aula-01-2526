package com.senac01.demo.controllers;


import com.senac01.demo.model.entites.Usuario;
import com.senac01.demo.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

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

        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco != null) {

            usuarioBanco.setEmail(usuario.getEmail());
            usuarioBanco.setName(usuario.getName());
            usuarioBanco.setSenha(usuario.getSenha());
            usuarioBanco.setStatus(usuario.getStatus());

            usuarioRepository.save(usuarioBanco);


            return ResponseEntity.ok("Atualizado com sucesso!!");
        }

        return ResponseEntity.notFound().build();


    }
}
