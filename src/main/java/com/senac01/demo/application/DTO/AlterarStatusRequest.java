package com.senac01.demo.application.DTO;

import com.senac01.demo.domain.enums.EnumStatusUsuario;

public record AlterarStatusRequest(EnumStatusUsuario status) {
}
