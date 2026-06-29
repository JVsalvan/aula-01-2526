package com.senac01.demo.presentation;

import com.senac01.demo.application.DTO.FichaTreinoRequest;
import com.senac01.demo.application.DTO.FichaTreinoResponse;
import com.senac01.demo.application.services.FichaTreinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ficha-treino")
public class FichaTreinoController {

    @Autowired
    private FichaTreinoService fichaTreinoService;

    @GetMapping("/aluno/{alunoId}")
    public ResponseEntity<List<FichaTreinoResponse>> listarPorAluno(@PathVariable Long alunoId) {
        return ResponseEntity.ok(fichaTreinoService.listarPorAluno(alunoId));
    }

    @PostMapping
    public ResponseEntity<Long> salvar(@RequestBody FichaTreinoRequest request) {
        return ResponseEntity.ok(fichaTreinoService.salvar(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        fichaTreinoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
