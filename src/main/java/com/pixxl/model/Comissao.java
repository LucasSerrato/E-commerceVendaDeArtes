package com.pixxl.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pixxl.status.ComissaoStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comissoes")
public class Comissao {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComissaoStatus status = ComissaoStatus.PENDENTE;

    private String nomeUsuario;

    private String mensagem;

    private String descricao;

    private String caminhoImagem;

    @ManyToOne @JoinColumn(name = "cliente_id") private Cliente cliente;

    @ManyToOne @JoinColumn(name = "artista_id") private Cliente artista;

    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    @JsonIgnoreProperties("comissoes")
    private Portfolio portfolio;

    @Column(name = "data", nullable = false) private LocalDateTime data;

    public Comissao() {}

    public Comissao(String nomeUsuario, String mensagem, String descricao,
                    String caminhoImagem, Cliente cliente, Cliente artista,
                    Portfolio portfolio) {
        this.nomeUsuario = nomeUsuario;
        this.mensagem = mensagem;
        this.descricao = descricao;
        this.caminhoImagem = caminhoImagem;
        this.cliente = cliente;
        this.artista = artista;
        this.portfolio = portfolio;
    }

    @PrePersist
    protected void onCreate() {
        this.data = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }
    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public String getMensagem() {
        return mensagem;
    }
    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCaminhoImagem() {
        return caminhoImagem;
    }
    public void setCaminhoImagem(String caminhoImagem) {
        this.caminhoImagem = caminhoImagem;
    }

    public LocalDateTime getData() {
        return data;
    }
    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Cliente getArtista() {
        return artista;
    }

    public void setArtista(Cliente artista) {
        this.artista = artista;
    }

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public ComissaoStatus getStatus() {
        return status;
    }

    public void setStatus(ComissaoStatus status) {
        this.status = status;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    @Override
    public String toString() {
        return "Comissao{"
                + "id=" + id + ", nomeUsuario='" + nomeUsuario + '\'' + ", mensagem='"
                + mensagem + '\'' + ", descricao='" + descricao + '\''
                + ", caminhoImagem='" + caminhoImagem + '\'' + ", cliente=" + cliente
                + ", data=" + data + '}';
    }
}
