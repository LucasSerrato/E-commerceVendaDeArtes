package com.pixxl.dto;

public class MensagemDTO {
    private Long remetenteId;
    private Long destinatarioId;
    private Long conversaId;
    private String mensagem;
    private String imagem;

    public MensagemDTO() {}

    public Long getRemetenteId() {
        return remetenteId;
    }

    public void setRemetenteId(Long remetenteId) {
        this.remetenteId = remetenteId;
    }

    public Long getDestinatarioId() {
        return destinatarioId;
    }

    public void setDestinatarioId(Long destinatarioId) {
        this.destinatarioId = destinatarioId;
    }

    public Long getConversaId() {
        return conversaId;
    }

    public void setConversaId(Long conversaId) {
        this.conversaId = conversaId;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    @Override
    public String toString() {
        return "MensagemDTO{"
                + "remetenteId=" + remetenteId + ", destinatarioId=" + destinatarioId
                + ", conversaId=" + conversaId + ", mensagem='" + mensagem + '\''
                + ", imagem='" + imagem + '\'' + '}';
    }
}
