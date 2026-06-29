package com.senac01.demo.application.services;

import com.senac01.demo.application.DTO.FichaTreinoRequest;
import com.senac01.demo.application.DTO.FichaTreinoResponse;
import com.senac01.demo.domain.entites.Exercicio;
import com.senac01.demo.domain.entites.FichaTreino;
import com.senac01.demo.domain.entites.Usuario;
import com.senac01.demo.domain.repository.AlunoRepository;
import com.senac01.demo.domain.repository.FichaTreinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FichaTreinoService {

    @Autowired
    private FichaTreinoRepository fichaTreinoRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    public List<FichaTreinoResponse> listarPorAluno(Long alunoId) {
        var usuario = buscarUsuario();
        return fichaTreinoRepository.findAllByAluno_IdAndProfessor_Id(alunoId, usuario.getId())
                .stream()
                .map(FichaTreinoResponse::new)
                .collect(Collectors.toList());
    }

    public Long salvar(FichaTreinoRequest request) {
        var usuario = buscarUsuario();
        var aluno = alunoRepository.findByIdAndProfessor_Id(request.alunoId(), usuario.getId())
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado!"));

        FichaTreino ficha = new FichaTreino();
        ficha.setObjetivo(request.objetivo());
        ficha.setAluno(aluno);
        ficha.setProfessor(usuario);

        List<Exercicio> exercicios = request.exercicios().stream().map(e -> {
            Exercicio ex = new Exercicio();
            ex.setNome(e.nome());
            ex.setSeries(e.series());
            ex.setRepeticoes(e.repeticoes());
            ex.setDescanso(e.descanso());
            ex.setFichaTreino(ficha);
            return ex;
        }).collect(Collectors.toList());

        ficha.setExercicios(exercicios);

        return fichaTreinoRepository.save(ficha).getId();
    }

    public void deletar(Long id) {
        var usuario = buscarUsuario();
        var ficha = fichaTreinoRepository.findByIdAndProfessor_Id(id, usuario.getId())
                .orElseThrow(() -> new RuntimeException("Ficha não encontrada!"));
        fichaTreinoRepository.delete(ficha);
    }

    private Usuario buscarUsuario() {
        return (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
