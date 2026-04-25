package com.senac01.demo.model.repository;


import com.senac01.demo.model.entites.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token,Long> {

    Optional<Token> findTokenByToken(String token);

}
