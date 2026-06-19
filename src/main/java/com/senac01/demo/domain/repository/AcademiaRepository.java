package com.senac01.demo.domain.repository;

import com.senac01.demo.domain.entites.Academia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcademiaRepository extends JpaRepository<Academia, Long> {

}