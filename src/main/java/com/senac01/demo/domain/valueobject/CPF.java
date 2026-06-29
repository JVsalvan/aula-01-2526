package com.senac01.demo.domain.valueobject;

import jakarta.persistence.Embeddable;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
public class CPF {

    private String cpf;

    public CPF(String cpf) {
        if (cpf == null) {
            throw new RuntimeException("CPF não pode ser nulo!");
        }
        String cleanValor = cpf.replaceAll("[^0-9]", "");
        if (!isValid(cleanValor)) {
            throw new RuntimeException("CPF inválido!");
        }
        this.cpf = cleanValor;
    }

    public String getValor() {
        return cpf;
    }

    private boolean isValid(String cpf) {
        if (cpf.length() != 11 || cpf.matches("(\\d)\\1{10}")) {
            return false;
        }
        return validarDigitosVerificadores(cpf);
    }

    private boolean validarDigitosVerificadores(String cpf) {
        int soma = 0;
        int peso = 10;
        for (int i = 0; i < 9; i++) {
            int num = Character.getNumericValue(cpf.charAt(i));
            soma += (num * peso);
            peso--;
        }

        int r = 11 - (soma % 11);
        int digito1 = (r == 10 || r == 11) ? 0 : r;

        soma = 0;
        peso = 11;
        for (int i = 0; i < 10; i++) {
            int num = Character.getNumericValue(cpf.charAt(i));
            soma += (num * peso);
            peso--;
        }

        r = 11 - (soma % 11);
        int digito2 = (r == 10 || r == 11) ? 0 : r;

        int cpfDigito1 = Character.getNumericValue(cpf.charAt(9));
        int cpfDigito2 = Character.getNumericValue(cpf.charAt(10));

        return (digito1 == cpfDigito1 && digito2 == cpfDigito2);
    }


    @Override
    public String toString() {
        return cpf.replaceAll("(\\d{3})(\\d{3})(\\d{3})(\\d{2})", "$1.$2.$3-$4");
    }

}
