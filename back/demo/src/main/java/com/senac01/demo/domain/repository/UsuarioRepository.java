package com.senac01.demo.domain.repository;


import com.senac01.demo.domain.entites.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    boolean existsUsuarioByEmailContainingAndSenha(String email, String senha);
}
