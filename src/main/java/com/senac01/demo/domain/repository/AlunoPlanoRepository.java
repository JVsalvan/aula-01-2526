package com.senac01.demo.domain.repository;

import com.senac01.demo.domain.entites.AlunoPlano;
import com.senac01.demo.domain.enums.EnumStatusAlunoPlano;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AlunoPlanoRepository extends JpaRepository<AlunoPlano,Long> {
    Optional<AlunoPlano> findByAluno_Id(Long alunoId);
    List<AlunoPlano> findAllByAluno_Professor_Id(Long professorId);

    List<AlunoPlano> findAllByStatusAndDataExpiracaoBefore(EnumStatusAlunoPlano status, LocalDateTime dataExpiracaoBefore);
}
