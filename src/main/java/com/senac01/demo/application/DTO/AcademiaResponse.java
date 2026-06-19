package com.senac01.demo.application.DTO;

import com.senac01.demo.domain.entites.Academia;
import com.senac01.demo.domain.enums.EnumStatusAcademia;

public record AcademiaResponse(

        Long id,
        String name,
        String email,
        EnumStatusAcademia status

) {

    public AcademiaResponse(Academia academia) {

        this(
                academia.getId(),
                academia.getName(),
                academia.getEmail(),
                academia.getStatus()
        );
    }
}