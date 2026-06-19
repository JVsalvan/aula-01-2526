package com.senac01.demo.application.DTO;

import com.senac01.demo.domain.enums.EnumStatusAcademia;

public record AcademiaRequest(

        String name,
        String email,
        EnumStatusAcademia status

) {
}