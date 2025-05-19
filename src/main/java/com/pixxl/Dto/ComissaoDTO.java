package com.pixxl.Dto;

import com.pixxl.model.Comissao;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

public class ComissaoDTO {
    private Long id;
    private String nomeUsuario;
    private String mensagem;
    private String descricao;
    private LocalDateTime data; // Alterado para LocalDateTime
    private List<String> imagens; // Se quer uma lista, mas o model tem só um caminhoImagem

    public ComissaoDTO(Comissao comissao) {
        this.id = comissao.getId();
        this.nomeUsuario = comissao.getNomeUsuario();
        this.mensagem = comissao.getMensagem();
        this.descricao = comissao.getDescricao();

        // Assumindo que Comissao tem um campo LocalDateTime data
        this.data = comissao.getData();

        // Se Comissao tem só uma imagem (String), transformar em lista com 1 elemento para o DTO
        if (comissao.getCaminhoImagem() != null && !comissao.getCaminhoImagem().isEmpty()) {
            this.imagens = Collections.singletonList(comissao.getCaminhoImagem());
        } else {
            this.imagens = Collections.emptyList();
        }
    }

    public Long getId() {
        return id;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public String getMensagem() {
        return mensagem;
    }

    public String getDescricao() {
        return descricao;
    }

    public LocalDateTime getData() {
        return data;
    }

    public List<String> getImagens() {
        return imagens;
    }
}
