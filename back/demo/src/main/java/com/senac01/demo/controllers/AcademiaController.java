package com.senac01.demo.controllers;

import com.senac01.demo.model.DTO.AlterarStatusAcademia;
import com.senac01.demo.model.entites.Academia;
import com.senac01.demo.model.enums.EnumStatusAcademia;
import com.senac01.demo.model.repository.AcademiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/academia")
public class AcademiaController {

    @Autowired
    private AcademiaRepository academiaRepository;

    @GetMapping
    public ResponseEntity<List<Academia>> listarTodas() {
        return ResponseEntity.ok(academiaRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Academia> buscarPorId(@PathVariable Long id) {
        return academiaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Long> salvar(@RequestBody Academia academia) {
        // Garante que o status inicial seja ATIVO se vier nulo
        if (academia.getStatus() == null) academia.setStatus(EnumStatusAcademia.ATIVO);

        Academia academiaSalva = academiaRepository.save(academia);
        return ResponseEntity.ok(academiaSalva.getId());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody Academia academia) {
        return academiaRepository.findById(id).map(academiaBanco -> {
            academiaBanco.setName(academia.getName());
            academiaBanco.setEmail(academia.getEmail());
            academiaBanco.setStatus(academia.getStatus());
            // Se houver outros campos como CNPJ ou Telefone, adicione aqui

            academiaRepository.save(academiaBanco);
            return ResponseEntity.ok("Unidade atualizada com sucesso!!");
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/AlterarStatus")
    public ResponseEntity<?> alterarStatusAcademia(@PathVariable Long id, @RequestBody AlterarStatusAcademia statusAcademia) {
        return academiaRepository.findById(id).map(academiaBanco -> {
            academiaBanco.setStatus(statusAcademia.statusAcademia());
            academiaRepository.save(academiaBanco);
            return ResponseEntity.ok(academiaBanco.getId()); // Retorna o ID como o seu Axios espera
        }).orElse(ResponseEntity.notFound().build());
    }
}