package com.senac01.demo.domain.repository;

import com.senac01.demo.domain.entites.FichaTreino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FichaTreinoRepository extends JpaRepository<FichaTreino, Long> {
    List<FichaTreino> findAllByAluno_IdAndProfessor_Id(Long alunoId, Long professorId);
    Optional<FichaTreino> findByIdAndProfessor_Id(Long id, Long professorId);
}
