package com.senac01.demo.domain.repository;

import com.senac01.demo.domain.entites.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository
        extends JpaRepository<Aluno, Long> {
}