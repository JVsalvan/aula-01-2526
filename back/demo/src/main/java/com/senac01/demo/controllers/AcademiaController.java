package com.senac01.demo.controllers;

import com.senac01.demo.model.DTO.AlterarStatusAcademia;
import com.senac01.demo.model.entites.Academia;
import com.senac01.demo.model.enums.EnumStatusAcademia;
import com.senac01.demo.model.repository.AcademiaRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/academia")
@Tag(name = "Academia", description = "Gerenciamento das unidades do sistema FitManager")
public class AcademiaController {

    @Autowired
    private AcademiaRepository academiaRepository;

    @Operation(summary = "Listar todas as academias", description = "Retorna a lista completa de unidades cadastradas no banco de dados.")
    @GetMapping
    public ResponseEntity<List<Academia>> listarTodas() {
        return ResponseEntity.ok(academiaRepository.findAll());
    }

    @Operation(summary = "Buscar por ID", description = "Localiza uma única academia através do seu identificador.")
    @GetMapping("/{id}")
    public ResponseEntity<Academia> buscarPorId(

            @PathVariable Long id) {
        return academiaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Salvar nova academia", description = "Registra uma nova unidade. Se o status não for informado, será definido como ATIVO.")
    @PostMapping
    public ResponseEntity<Long> salvar(@RequestBody Academia academia) {
        if (academia.getStatus() == null) academia.setStatus(EnumStatusAcademia.ATIVO);
        Academia academiaSalva = academiaRepository.save(academia);
        return ResponseEntity.ok(academiaSalva.getId());
    }

    @Operation(summary = "Atualizar academia", description = "Edita os dados de uma academia existente (Nome, E-mail e Status).")
    @PutMapping("/{id}")
    public ResponseEntity<?> editar(
           @PathVariable Long id,
            @RequestBody Academia academia) {
        return academiaRepository.findById(id).map(academiaBanco -> {
            academiaBanco.setName(academia.getName());
            academiaBanco.setEmail(academia.getEmail());
            academiaBanco.setStatus(academia.getStatus());
            academiaRepository.save(academiaBanco);
            return ResponseEntity.ok("Unidade atualizada com sucesso!!");
        }).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Alterar status da unidade", description = "Endpoint específico para ativar ou desativar uma academia via DTO.")
    @PutMapping("/{id}/AlterarStatus")
    public ResponseEntity<?> alterarStatusAcademia(
            @PathVariable Long id,
            @RequestBody AlterarStatusAcademia statusAcademia) {
        return academiaRepository.findById(id).map(academiaBanco -> {
            academiaBanco.setStatus(statusAcademia.statusAcademia());
            academiaRepository.save(academiaBanco);
            return ResponseEntity.ok(academiaBanco.getId());
        }).orElse(ResponseEntity.notFound().build());
    }
}