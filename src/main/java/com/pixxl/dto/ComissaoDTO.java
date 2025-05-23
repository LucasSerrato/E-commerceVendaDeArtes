package com.pixxl.dto;

import com.pixxl.model.Comissao;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

public class ComissaoDTO {
    private Long id;
    private String nomeUsuario;
    private String mensagem;
    private String descricao;
    private LocalDateTime data;
    private List<String> imagens;
    private String status;
    private Long clienteId;
    private ArtistaResumoDTO artista;
    private PortfolioResumoDTO portfolio;

    public ComissaoDTO(Comissao comissao) {
        this.id = comissao.getId();
        this.nomeUsuario = comissao.getNomeUsuario();
        this.mensagem = comissao.getMensagem();
        this.descricao = comissao.getDescricao();
        this.data = comissao.getData();
        this.status = comissao.getStatus().name();

        if (comissao.getCliente() != null) {
            this.clienteId = comissao.getCliente().getId();
        }

        if (comissao.getCaminhoImagem() != null
                && !comissao.getCaminhoImagem().isEmpty()) {
            this.imagens = Collections.singletonList(comissao.getCaminhoImagem());
        } else {
            this.imagens = Collections.emptyList();
        }

        if (comissao.getArtista() != null && comissao.getArtista().isArtista()) {
            this.artista = new ArtistaResumoDTO(comissao.getArtista());
        }

        if (comissao.getPortfolio() != null) {
            this.portfolio = new PortfolioResumoDTO(comissao.getPortfolio());
        }
    }

    public PortfolioResumoDTO getPortfolio() {
        return portfolio;
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
    public String getStatus() {
        return status;
    }
    public Long getClienteId() {
        return clienteId;
    }
    public ArtistaResumoDTO getArtista() {
        return artista;
    }
}
