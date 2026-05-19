package com.senac01.demo.presentation;


import com.senac01.demo.application.DTO.AlterarStatusRequest;
import com.senac01.demo.application.DTO.LoginRequest;
import com.senac01.demo.application.DTO.UsuarioResponse;
import com.senac01.demo.domain.entites.Usuario;
import com.senac01.demo.domain.repository.UsuarioRepository;
import com.senac01.demo.application.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuarios controller",description = "Controladora responsavel por gerenciar os usuarios!")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @GetMapping
    @Operation(summary = "Listar todos",description = "Método para listar todos os usuários!")
    public ResponseEntity<List<UsuarioResponse>> listarTodos() {

        return ResponseEntity.ok(usuarioService.ListarTodos());
    }


    public boolean ValidaUsuarioSenha(LoginRequest loginRequest) {
        try {

            return usuarioRepository
                    .existsUsuarioByEmailContainingAndSenha(
                            loginRequest.email(),
                            loginRequest.senha()
                    );

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @GetMapping("/{id}")
    @Operation(summary = "Consulta de usuario por ID",
            description = "Médoto responsavel por consultar um unico usuario por ID e se não existir retorna null!")
    public ResponseEntity<UsuarioResponse> buscarPorId(@PathVariable Long id) {

        return ResponseEntity.ok(usuarioService.BuscarUsuarioPorId(id));
    }


    @PostMapping
    @Operation(summary = "Criar usuario",description = "Metodo resposavel por criar usuário")
    public ResponseEntity<Long> salvar(@RequestBody Usuario usuario) {

        return ResponseEntity.ok(usuarioRepository.save(usuario).getId());
    }


    @PostMapping("/adm")
    @Operation(summary = "Criar usuario adm",description = "Metodo resposavel por criar usuário")
    public ResponseEntity<Long> salvarAdm(@RequestBody Usuario usuario) {

        usuario.setRole("ROLE_ADMIN");

        return ResponseEntity.ok(usuarioRepository.save(usuario).getId());
    }


    @PutMapping("/{id}")
    @Operation(summary = "Atualizar usuario",description = "Metodo resposavel por atualizar usuário")
    public ResponseEntity<?> alterarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {

        var alterarUsuarioResult = usuarioService.AterarUsuario(id, usuario);

        return alterarUsuarioResult
                ? ResponseEntity.ok("Atualizado com sucesso!")
                : ResponseEntity.notFound().build();
    }


    @PutMapping("/{id}/AlterarStatus")
    public ResponseEntity<?> AlterarStatus(@PathVariable Long id,
                                           @RequestBody AlterarStatusRequest statusRequest) {

        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco != null) {

            usuarioBanco.setStatus(statusRequest.status());

            usuarioRepository.save(usuarioBanco);

            return ResponseEntity.ok("Atualizado com sucesso!");
        }

        return ResponseEntity.notFound().build();
    }


    @GetMapping("/usuariologado")
    @Operation(summary = "Consulta usuario logado",
            description = "busca usuario da sessãoo")
    public ResponseEntity<Usuario> buscarUsarioLogado(Authentication authentication) {

        Usuario usuario = (Usuario) authentication.getPrincipal();

        return ResponseEntity.ok(usuarioService.BuscarUsuarioLogado(usuario));
    }
}