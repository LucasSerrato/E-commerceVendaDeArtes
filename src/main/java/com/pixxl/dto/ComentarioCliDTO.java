package com.pixxl.dto;

import com.pixxl.model.ComentarioCliImgs;

import java.time.LocalDateTime;

public class ComentarioCliDTO {
    private Long id;
    private String descricao;
    private String imagem;
    private String nomeUsuario;
    private LocalDateTime data;
    private Long clienteId;

    public ComentarioCliDTO(ComentarioCliImgs c) {
        this.id = c.getId();
        this.descricao = c.getComentario().getDescricao();
        this.imagem = c.getImagem();
        this.nomeUsuario = c.getComentario().getCliente().getNome();
        this.clienteId = c.getComentario().getCliente().getId();
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

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }
}
