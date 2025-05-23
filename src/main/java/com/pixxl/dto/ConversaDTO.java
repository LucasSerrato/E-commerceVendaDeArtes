package com.pixxl.dto;

public class ConversaDTO {
    private Long conversaId;
    private Long idOutroUsuario;
    private String nomeOutroUsuario;
    private String imagemOutroUsuario;
    private boolean outroUsuarioEhArtista;

    public Long getConversaId() {
        return conversaId;
    }

    public void setConversaId(Long conversaId) {
        this.conversaId = conversaId;
    }

    public Long getIdOutroUsuario() {
        return idOutroUsuario;
    }

    public void setIdOutroUsuario(Long idOutroUsuario) {
        this.idOutroUsuario = idOutroUsuario;
    }

    public String getNomeOutroUsuario() {
        return nomeOutroUsuario;
    }

    public void setNomeOutroUsuario(String nomeOutroUsuario) {
        this.nomeOutroUsuario = nomeOutroUsuario;
    }

    public String getImagemOutroUsuario() {
        return imagemOutroUsuario;
    }

    public void setImagemOutroUsuario(String imagemOutroUsuario) {
        this.imagemOutroUsuario = imagemOutroUsuario;
    }

    public boolean isOutroUsuarioEhArtista() {
        return outroUsuarioEhArtista;
    }

    public void setOutroUsuarioEhArtista(boolean outroUsuarioEhArtista) {
        this.outroUsuarioEhArtista = outroUsuarioEhArtista;
    }
}
