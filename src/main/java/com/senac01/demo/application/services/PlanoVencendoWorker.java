package com.senac01.demo.application.services;

import com.senac01.demo.domain.entites.AlunoPlano;
import com.senac01.demo.domain.enums.EnumStatusAlunoPlano;
import com.senac01.demo.domain.repository.AlunoPlanoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
@RequiredArgsConstructor
public class PlanoVencendoWorker {

    private final AlunoPlanoRepository alunoPlanoRepository;
    private final EmailService emailService;

    @Scheduled(cron = "0 0 9 * * *")
    public void notificarAlunosVencendoPlano(){
        LocalDateTime em5Dias = LocalDateTime.now().plusDays(5);

        List<AlunoPlano> planos = alunoPlanoRepository.findAllByStatusAndDataExpiracaoBefore(EnumStatusAlunoPlano.ATIVO, em5Dias);

        for (AlunoPlano alunoPlano : planos) {
            long diasRestantes = ChronoUnit.DAYS.between(
                    LocalDateTime.now(),
                    alunoPlano.getDataExpiracao()
            );

            String nomeAluno = alunoPlano.getAluno().getNome();
            String nomeProfessor = alunoPlano.getAluno().getProfessor().getNome();

            if (diasRestantes <= 0) {
                alunoPlano.setStatus(EnumStatusAlunoPlano.EXPIRADO);
                alunoPlanoRepository.save(alunoPlano);
            }

            emailService.enviarEmailAlunosVencendoPlano(nomeAluno, nomeProfessor, diasRestantes);
        }
    }

}
