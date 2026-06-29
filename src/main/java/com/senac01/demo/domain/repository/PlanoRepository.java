package com.senac01.demo.domain.repository;

import com.senac01.demo.domain.entites.Plano;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlanoRepository extends JpaRepository<Plano,Long> {
    List<Plano> findAllByUsuario_Id(Long id);
    Optional<Plano> findByIdAndUsuario_Id(Long id, Long idUsuario);
}
