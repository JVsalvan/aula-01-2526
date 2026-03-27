package com.senac01.demo.model.DTO;

import com.senac01.demo.model.enums.EnumStatusUsuario;

public record AlterarStatusRequest(EnumStatusUsuario status) {
}
