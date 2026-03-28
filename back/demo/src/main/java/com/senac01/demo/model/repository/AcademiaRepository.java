package com.senac01.demo.model.repository;

import com.senac01.demo.model.entites.Academia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AcademiaRepository extends JpaRepository<Academia, Long> {

}