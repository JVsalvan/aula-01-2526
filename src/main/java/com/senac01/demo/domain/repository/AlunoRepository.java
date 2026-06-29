package com.senac01.demo.domain.repository;

import com.senac01.demo.domain.entites.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlunoRepository
        extends JpaRepository<Aluno, Long> {
    List<Aluno> findAllByProfessor_Id(Long id);
    Optional<Aluno> findByIdAndProfessor_Id(Long id, Long idUsuario);
}