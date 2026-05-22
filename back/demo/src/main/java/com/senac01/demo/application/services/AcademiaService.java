package com.senac01.demo.application.services;


import com.senac01.demo.application.DTO.AcademiaRequest;
import com.senac01.demo.application.DTO.AcademiaResponse;
import com.senac01.demo.application.DTO.AlterarStatusAcademia;
import com.senac01.demo.domain.entites.Academia;
import com.senac01.demo.domain.enums.EnumStatusAcademia;
import com.senac01.demo.domain.repository.AcademiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AcademiaService {

    @Autowired
    private AcademiaRepository academiaRepository;


    public List<AcademiaResponse> ListarTodas() {
        try{

            return academiaRepository.findAll()
                    .stream()
                    .map(AcademiaResponse::new)
                    .collect(Collectors.toList());

        } catch (Exception e) {

            throw new RuntimeException(e);
        }
    }

    public AcademiaResponse BuscarAcademiaPorId(Long id) {

        try{

            var academia = academiaRepository.findById(id).orElse(null);

            return new AcademiaResponse(academia);

        } catch (Exception e) {

            throw new RuntimeException(e);
        }
    }

    public Long SalvarAcademia(AcademiaRequest academia) {

        try {

            Academia novaAcademia = new Academia();

            novaAcademia.setName(academia.name());
            novaAcademia.setEmail(academia.email());
            novaAcademia.setStatus(academia.status());

            if (novaAcademia.getStatus() == null){

                novaAcademia.setStatus(EnumStatusAcademia.ATIVO);
            }

            return academiaRepository.save(novaAcademia).getId();

        } catch (Exception e) {

            throw new RuntimeException(e);
        }
    }

    public boolean AlterarAcademia(Long id, AcademiaRequest academia) {

        var academiaBanco = academiaRepository.findById(id).orElse(null);

        if (academiaBanco != null){

            academiaBanco.setName(academia.name());
            academiaBanco.setEmail(academia.email());
            academiaBanco.setStatus(academia.status());

            academiaRepository.save(academiaBanco);

            return true;
        }

        return false;
    }

    public boolean AlterarStatus(Long id, AlterarStatusAcademia statusAcademia) {

        var academiaBanco = academiaRepository.findById(id).orElse(null);

        if (academiaBanco != null){

            academiaBanco.setStatus(statusAcademia.statusAcademia());

            academiaRepository.save(academiaBanco);

            return true;
        }

        return false;
    }
}