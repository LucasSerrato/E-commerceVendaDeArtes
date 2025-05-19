package com.pixxl.Dto;

import com.pixxl.model.ComentarioCliImgs;

import java.time.LocalDateTime;

public class ComentarioCliDTO {
    private Long id;
    private String descricao;
    private String imagem;
    private String nomeUsuario;
    private LocalDateTime data;

    public ComentarioCliDTO(ComentarioCliImgs c) {
        this.id = c.getId();
        this.descricao = c.getComentario().getDescricao();
        this.imagem = c.getImagem();
        this.nomeUsuario = c.getComentario().getCliente().getNome();
        this.data = c.getComentario().getDataPost();
    }

    public ComentarioCliDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }
}
