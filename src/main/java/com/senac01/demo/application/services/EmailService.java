package com.senac01.demo.application.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    @Value( "${spring.resend.apiKey}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public void enviarEmailAlunosVencendoPlano(String nomeAluno, String nomeProfessor, Long diasParaVencer){

        String html = "";
        String subject = "Seu plano vence em breve!";

        if(diasParaVencer <= 0){
            html = "<p>" + nomeAluno + " seu plano venceu! Entre em contato para renovar.</p>";
            subject = "Seu plano venceu!";
        } else {
            html = "<p>" + nomeAluno + " seu plano vence em " + diasParaVencer + " dias. Entre em contato para renovar.</p>";
        }

        String body = null;
        try {
            ObjectMapper mapper = new ObjectMapper();

            Map<String, Object> bodyMap = new HashMap<>();
            bodyMap.put("from", nomeProfessor + " <onboarding@resend.dev>");
            bodyMap.put("to", List.of("delivered@resend.dev"));
            bodyMap.put("subject", subject);
            bodyMap.put("html", html);

            body = mapper.writeValueAsString(bodyMap);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Erro ao converter para JSON: " + e.getMessage());
        }

        try {
            System.out.println("Enviando email para: " + nomeAluno);
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> request = new HttpEntity<>(body, headers);
            restTemplate.postForEntity("https://api.resend.com/emails", request, String.class);
            System.out.println("Email enviado com sucesso!");
        } catch (RestClientException e) {
            System.out.println("Erro ao enviar email: " + e.getMessage());
            throw new RuntimeException("Erro ao enviar email: " + e.getMessage());
        }
    }

}
