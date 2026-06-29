package com.senac01.demo.application.services;

import com.senac01.demo.application.DTO.*;
import com.senac01.demo.domain.enums.EnumStatusAlunoPlano;
import com.senac01.demo.domain.entites.Aluno;
import com.senac01.demo.domain.entites.AlunoPlano;
import com.senac01.demo.domain.entites.Usuario;
import com.senac01.demo.domain.repository.AlunoPlanoRepository;
import com.senac01.demo.domain.repository.AlunoRepository;
import com.senac01.demo.domain.repository.FichaTreinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;
    @Autowired
    private PlanoService planoService;
    @Autowired
    private AlunoPlanoRepository alunoPlanoRepository;
    @Autowired
    private FichaTreinoRepository fichaTreinoRepository;

    public List<AlunoResponse> listarTodos() {

        return alunoRepository.findAllByProfessor_Id(buscarUsuario().getId())
                .stream()
                .map(AlunoResponse::new)
                .collect(Collectors.toList());
    }

    public AlunoDetalhesResponse buscarPorId(Long id) {
        var usuario = buscarUsuario();

        var alunoBanco = alunoRepository.findByIdAndProfessor_Id(id, usuario.getId()).orElseThrow(()-> new RuntimeException("Aluno não encontrado!"));
        var alunoPlano = alunoPlanoRepository.findByAluno_Id(id).orElse(null);
        var plano = alunoPlano != null ? alunoPlano.getPlano() : null;
        var fichas = fichaTreinoRepository.findAllByAluno_IdAndProfessor_Id(id, usuario.getId());

        return new AlunoDetalhesResponse(alunoBanco, alunoPlano, plano, fichas);
    }

    public boolean alterarAluno(
            Long id,
          Aluno aluno
    ) {
        var usuario = buscarUsuario();
        var alunoBanco =
                alunoRepository.findByIdAndProfessor_Id(id, usuario.getId()).orElse(null);
        if(alunoBanco == null){
            return false;
        }

        alunoBanco.setNome(aluno.getNome());
        alunoBanco.setCpf(aluno.getCpf());
        alunoBanco.setTelefone(aluno.getTelefone());
        alunoBanco.setStatus(aluno.getStatus());

        alunoRepository.save(alunoBanco);

        return true;
    }

    public boolean alterarStatus(Long id, AlterarStatusRequest statusRequest) {
        var usuario = buscarUsuario();
        var alunoBanco = alunoRepository.findByIdAndProfessor_Id(id, usuario.getId()).orElse(null);

        if (alunoBanco != null) {
            alunoBanco.setStatus(statusRequest.status());
            alunoRepository.save(alunoBanco);
            return true;
        }

        return false;
    }

    public Long salvar(AlunoRequest aluno) {
        try{

            var alunoPersist = alunoRepository.save(new Aluno(aluno, buscarUsuario()));
            var plano = planoService.buscarPorId(aluno.planoId());

            var alunoPlano = new AlunoPlano(alunoPersist, plano);
            alunoPlanoRepository.save(alunoPlano);
            return alunoPersist.getId();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public void renovarPlano(Long alunoId) {
        var usuario = buscarUsuario();
        var alunoPlano = alunoPlanoRepository.findByAluno_Id(alunoId)
                .orElseThrow(() -> new RuntimeException("Plano do aluno não encontrado!"));

        // Verifica se o aluno pertence ao professor logado
        if (!alunoPlano.getAluno().getProfessor().getId().equals(usuario.getId())) {
            throw new RuntimeException("Acesso negado!");
        }

        var plano = alunoPlano.getPlano();
        alunoPlano.setDataInicio(LocalDateTime.now());
        alunoPlano.setDataExpiracao(LocalDateTime.now().plusDays(plano.getDiasValidade()));
        alunoPlano.setStatus(EnumStatusAlunoPlano.ATIVO);

        alunoPlanoRepository.save(alunoPlano);
    }

    public void cancelarPlano(Long alunoId) {
        var usuario = buscarUsuario();
        var alunoPlano = alunoPlanoRepository.findByAluno_Id(alunoId)
                .orElseThrow(() -> new RuntimeException("Plano do aluno não encontrado!"));

        if (!alunoPlano.getAluno().getProfessor().getId().equals(usuario.getId())) {
            throw new RuntimeException("Acesso negado!");
        }

        alunoPlano.setStatus(EnumStatusAlunoPlano.CANCELADO);
        alunoPlanoRepository.save(alunoPlano);
    }

    public void trocarPlano(Long alunoId, Long novoPlanoId) {
        var usuario = buscarUsuario();
        var alunoPlano = alunoPlanoRepository.findByAluno_Id(alunoId)
                .orElseThrow(() -> new RuntimeException("Plano do aluno não encontrado!"));

        if (!alunoPlano.getAluno().getProfessor().getId().equals(usuario.getId())) {
            throw new RuntimeException("Acesso negado!");
        }

        var novoPlano = planoService.buscarPorId(novoPlanoId);

        alunoPlano.setPlano(novoPlano);
        alunoPlano.setDataInicio(LocalDateTime.now());
        alunoPlano.setDataExpiracao(LocalDateTime.now().plusDays(novoPlano.getDiasValidade()));
        alunoPlano.setStatus(EnumStatusAlunoPlano.ATIVO);

        alunoPlanoRepository.save(alunoPlano);
    }

    public DashboardResponse getDashboardData() {
        var usuario = buscarUsuario();
        var professorId = usuario.getId();

        long totalAlunos = alunoRepository.findAllByProfessor_Id(professorId).size();
        var todosPlanos = alunoPlanoRepository.findAllByAluno_Professor_Id(professorId);

        long alunosPlanosCancelados = todosPlanos.stream()
                .filter(p -> p.getStatus() == EnumStatusAlunoPlano.CANCELADO)
                .count();

        LocalDateTime agora = LocalDateTime.now();

        List<AlunoProximoVencimentoResponse> proximosVencimentos = todosPlanos.stream()
                .filter(p -> p.getStatus() != EnumStatusAlunoPlano.CANCELADO)
                .map(p -> {
                    long diasRestantes = ChronoUnit.DAYS.between(agora, p.getDataExpiracao());
                    return new AlunoProximoVencimentoResponse(
                            p.getAluno().getId(),
                            p.getAluno().getNome(),
                            p.getDataExpiracao(),
                            diasRestantes
                    );
                })
                .filter(p -> p.diasRestantes() <= 5)
                .sorted(Comparator.comparing(AlunoProximoVencimentoResponse::diasRestantes))
                .collect(Collectors.toList());

        long alunosPlanosAVencer = proximosVencimentos.size();

        return new DashboardResponse(
                totalAlunos,
                alunosPlanosAVencer,
                alunosPlanosCancelados,
                proximosVencimentos
        );
    }

    private Usuario buscarUsuario() {
        var usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (usuario == null){
            throw new RuntimeException("Sem usuario logado!");
        }
        return usuario;
    }
}