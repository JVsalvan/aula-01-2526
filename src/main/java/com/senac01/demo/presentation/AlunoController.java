package com.senac01.demo.presentation;

import com.senac01.demo.application.DTO.*;
import com.senac01.demo.application.services.AlunoService;
import com.senac01.demo.domain.entites.Aluno;
import com.senac01.demo.domain.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @GetMapping
    public ResponseEntity<List<AlunoResponse>>
    listarTodos() {

        return ResponseEntity.ok(
                alunoService.listarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoDetalhesResponse>
    buscarPorId(@PathVariable Long id) {

        return ResponseEntity.ok(
                alunoService.buscarPorId(id)
        );
    }

    @PostMapping
    public ResponseEntity<Long>
    salvar(@RequestBody AlunoRequest aluno) {

        return ResponseEntity.ok(
                alunoService.salvar(aluno)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> alterarAluno(
            @PathVariable Long id,
            @RequestBody Aluno aluno
    ) {

        boolean result =
                alunoService.alterarAluno(id, aluno);

        return result
                ? ResponseEntity.ok("Atualizado com sucesso!")
                : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/AlterarStatus")
    public ResponseEntity<?> alterarStatus(
            @PathVariable Long id,
            @RequestBody AlterarStatusRequest statusRequest
    ) {

        boolean result = alunoService.alterarStatus(id, statusRequest);

        return result
                ? ResponseEntity.ok("Atualizado com sucesso!")
                : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/renovar")
    public ResponseEntity<?> renovarPlano(@PathVariable Long id) {
        alunoService.renovarPlano(id);
        return ResponseEntity.ok("Plano renovado com sucesso!");
    }

    @PutMapping("/{id}/cancelar-plano")
    public ResponseEntity<?> cancelarPlano(@PathVariable Long id) {
        alunoService.cancelarPlano(id);
        return ResponseEntity.ok("Plano cancelado com sucesso!");
    }

    @PutMapping("/{id}/trocar-plano")
    public ResponseEntity<?> trocarPlano(
            @PathVariable Long id,
            @RequestBody AlterarPlanoRequest request
    ) {
        alunoService.trocarPlano(id, request.novoPlanoId());
        return ResponseEntity.ok("Plano alterado com sucesso!");
    }
}