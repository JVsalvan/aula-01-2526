package com.senac01.demo.presentation;


import com.senac01.demo.application.DTO.LoginRequest;
import com.senac01.demo.application.DTO.LoginResponse;
import com.senac01.demo.application.services.UsuarioService;
import com.senac01.demo.domain.repository.UsuarioRepository;
import com.senac01.demo.application.services.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Tag(description = "controle de autentificação", name ="Serviço de autentificação")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;
    private UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }


    @PostMapping("/login")
    @Operation(description = "Valida senha asdhaukshd 50 carecteres, calcula longitudo com latitud!",summary = "Login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){


        if(usuarioService.ValidaUsuarioSenha(loginRequest)){

            var token = tokenService.gerarToken(loginRequest.email());

            return ResponseEntity.ok(new LoginResponse(token));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}
