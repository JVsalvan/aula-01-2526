package com.senac01.demo.presentation;

import com.senac01.demo.application.DTO.AcademiaRequest;
import com.senac01.demo.application.DTO.AcademiaResponse;
import com.senac01.demo.application.DTO.AlterarStatusAcademia;
import com.senac01.demo.application.services.AcademiaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/academia")
@Tag(name = "Academia controller",description = "Controladora responsavel por gerenciar as academias!")
public class AcademiaController {

    @Autowired
    private AcademiaService academiaService;


    @GetMapping
    @Operation(summary = "Listar todas",description = "Método para listar todas as academias!")
    public ResponseEntity<List<AcademiaResponse>> listarTodas(){

        var academias = academiaService.ListarTodas();

        return ResponseEntity.ok(academias);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta de academia por ID", description = "Método responsavel por consultar uma unica academia por ID e se não existir retorna null!")
    public ResponseEntity<AcademiaResponse> buscarPorId(@PathVariable Long id){

        return ResponseEntity.ok(academiaService.BuscarAcademiaPorId(id));
    }

    @PostMapping
    @Operation(summary = "Criar academia",description = "Metodo responsavel por criar academia")
    public ResponseEntity<Long> salvar (@RequestBody AcademiaRequest academia){

        return ResponseEntity.ok(academiaService.SalvarAcademia(academia));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar academia",description = "Metodo responsavel por atualizar academia")
    public ResponseEntity<?> alterarAcademia (@PathVariable Long id, @RequestBody AcademiaRequest academia){

        var alterarAcademiaResult = academiaService.AlterarAcademia(id,academia);

        return alterarAcademiaResult
                ? ResponseEntity.ok("Atualizado com sucesso!")
                : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/AlterarStatus")
    public ResponseEntity<?> AlterarStatus(@PathVariable Long id,
                                           @RequestBody AlterarStatusAcademia statusAcademia){

        boolean alterarStatusResult = academiaService.AlterarStatus(id,statusAcademia);

        return alterarStatusResult
                ? ResponseEntity.ok("Atualizado com sucesso!")
                : ResponseEntity.notFound().build();
    }
}