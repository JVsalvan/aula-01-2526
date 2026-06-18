package com.senac01.demo.presentation;

import com.senac01.demo.application.DTO.AlterarStatusRequest;
import com.senac01.demo.application.DTO.AlunoResponse;
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
    private AlunoRepository alunoRepository;

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
    public ResponseEntity<AlunoResponse>
    buscarPorId(@PathVariable Long id) {

        return ResponseEntity.ok(
                alunoService.buscarPorId(id)
        );
    }

    @PostMapping
    public ResponseEntity<Long>
    salvar(@RequestBody Aluno aluno) {

        return ResponseEntity.ok(
                alunoRepository.save(aluno).getId()
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

        var alunoBanco =
                alunoRepository.findById(id).orElse(null);

        if (alunoBanco == null) {
            return ResponseEntity.notFound().build();
        }

        alunoBanco.setStatus(
                statusRequest.status()
        );

        alunoRepository.save(alunoBanco);

        return ResponseEntity.ok(
                "Atualizado com sucesso!"
        );
    }
}