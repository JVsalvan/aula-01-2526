package com.senac01.demo.application.services;

import com.senac01.demo.application.DTO.AlunoResponse;
import com.senac01.demo.domain.entites.Aluno;
import com.senac01.demo.domain.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    public List<AlunoResponse> listarTodos() {

        return alunoRepository.findAll()
                .stream()
                .map(AlunoResponse::new)
                .collect(Collectors.toList());
    }

    public AlunoResponse buscarPorId(Long id) {

        var aluno =
                alunoRepository.findById(id).orElse(null);

        if (aluno == null) {
            return null;
        }

        return new AlunoResponse(aluno);
    }

    public boolean alterarAluno(
            Long id,
          Aluno aluno
    ) {

        var alunoBanco =
                alunoRepository.findById(id).orElse(null);

        if (alunoBanco == null) {
            return false;
        }

        alunoBanco.setNome(aluno.getNome());
        alunoBanco.setCpf(aluno.getCpf());
        alunoBanco.setTelefone(aluno.getTelefone());
        alunoBanco.setEmail(aluno.getEmail());
        alunoBanco.setStatus(aluno.getStatus());

        alunoRepository.save(alunoBanco);

        return true;
    }
}