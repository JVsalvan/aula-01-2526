package com.senac01.demo.presentation;

import com.senac01.demo.application.DTO.PlanoRequest;
import com.senac01.demo.application.services.PlanoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/planos")
@Tag(name = "Plano controller",description = "Controladora responsavel por gerenciar os planos!")
public class PlanoController {

    @Autowired
    private PlanoService planoService;

    @PostMapping
    @Operation(summary = "Cadastra um plano", description = "Endpoint responsavel por cadastrar planos")
    public ResponseEntity<?> cadastrar(@RequestBody PlanoRequest planoRequest){
        return ResponseEntity.ok(planoService.salvar(planoRequest));
    }

    @GetMapping
    @Operation(summary = "Buscar planos", description = "Busca todos os planos do usuario")
    public ResponseEntity<?> cadastrar(){
        return ResponseEntity.ok(planoService.listarTodos());
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Alterar status do plano", description = "Altera o status do plano")
    public ResponseEntity<?> alterarStatus(@PathVariable Long id){
        var result = planoService.alterarAtivo(id);
        return result ? ResponseEntity.ok("Atualizado com sucesso!") : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Alterar plano", description = "Altera o plano")
    public ResponseEntity<?> alterarPlano(@PathVariable Long id, @RequestBody PlanoRequest planoRequest){
        var result = planoService.atualizar(id, planoRequest);
        return result ? ResponseEntity.ok("Atualizado com sucesso!") : ResponseEntity.notFound().build();
    }

}
