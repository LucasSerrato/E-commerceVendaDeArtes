package com.pixxl.dto;

import com.pixxl.model.Comissao;

import java.text.NumberFormat;
import java.util.Locale;

public class ComissaoDTO {
    private String mensagem;
    private String valorFormatado;

    public ComissaoDTO(Comissao comissao) {
        this.mensagem = comissao.getMensagem();
        this.valorFormatado = formatarParaReal(comissao.getValor());
    }

    private String formatarParaReal(Double valor) {
        NumberFormat formatter = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
        return formatter.format(valor);
    }

    public String getMensagem() {
        return mensagem;
    }

    public String getValorFormatado() {
        return valorFormatado;
    }
}
