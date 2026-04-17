package com.senac01.demo.model.DTO;

import com.senac01.demo.model.enums.EnumStatusAcademia;
import io.swagger.v3.oas.annotations.Operation;


public record AlterarStatusAcademia(EnumStatusAcademia statusAcademia) {
}
