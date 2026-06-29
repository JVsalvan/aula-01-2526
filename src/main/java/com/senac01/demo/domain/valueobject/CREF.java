package com.senac01.demo.domain.valueobject;

import jakarta.persistence.Embeddable;
import lombok.NoArgsConstructor;

import java.util.regex.Pattern;

@Embeddable
@NoArgsConstructor
public class CREF {

    private static final Pattern CREF_PATTERN =
            Pattern.compile("^\\d{4,6}-[GLR]/[A-Z]{2}$");

    private String cref;

    public CREF(String cref) {
        if (cref == null || cref.isBlank()) {
            throw new IllegalArgumentException("CREF não pode ser vazio");
        }

        String normalizado = cref.trim().toUpperCase();

        if (!CREF_PATTERN.matcher(normalizado).matches()) {
            throw new IllegalArgumentException(
                    "Formato de CREF inválido: '%s'. Esperado: 123456-G/SP".formatted(cref)
            );
        }


        this.cref = cref;
    }

    @Override
    public String toString() { return cref; }

}
