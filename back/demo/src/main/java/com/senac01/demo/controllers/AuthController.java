package com.senac01.demo.controllers;


import com.senac01.demo.model.DTO.LoginRequest;
import com.senac01.demo.model.DTO.LoginResponse;
import com.senac01.demo.model.repository.UsuarioRepository;
import com.senac01.demo.services.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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

    @PostMapping("/login")
    @Operation(description = "Valída senhas" , summary = "Login")
    public ResponseEntity<?> login (@RequestBody LoginRequest loginRequest){

        if (loginRequest.email().equals("joaovitorsalvan3@gmail.com") && loginRequest.senha().equals("1234")){

            var token = tokenService.gerarToken(loginRequest.email());


            return ResponseEntity.ok( new LoginResponse(token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
