package com.pixxl.dto;

public class AceiteDTO {
    private String mensagem;
    private double valor;
    private Long comissaoId; // ✅ Campo adicionado

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public Long getComissaoId() {
        return comissaoId;
    }

    public void setComissaoId(Long comissaoId) {
        this.comissaoId = comissaoId;
    }
}
