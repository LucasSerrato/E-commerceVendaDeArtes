package com.pixxl.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comissoes")
public class Comissao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeUsuario;

    private String mensagem;

    private String descricao;

    private String caminhoImagem; // caminho da imagem salva

    @Column(name = "data", nullable = false)
    private LocalDateTime data;

    public Comissao() {
    }

    public Comissao(String nomeUsuario, String mensagem, String descricao, String caminhoImagem) {
        this.nomeUsuario = nomeUsuario;
        this.mensagem = mensagem;
        this.descricao = descricao;
        this.caminhoImagem = caminhoImagem;
    }

    // Preenche a data antes de salvar no banco
    @PrePersist
    protected void onCreate() {
        this.data = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNomeUsuario() { return nomeUsuario; }
    public void setNomeUsuario(String nomeUsuario) { this.nomeUsuario = nomeUsuario; }

    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getCaminhoImagem() { return caminhoImagem; }
    public void setCaminhoImagem(String caminhoImagem) { this.caminhoImagem = caminhoImagem; }

    public LocalDateTime getData() { return data; }
    public void setData(LocalDateTime data) { this.data = data; }

    @Override
    public String toString() {
        return "Comissao{" +
                "id=" + id +
                ", nomeUsuario='" + nomeUsuario + '\'' +
                ", mensagem='" + mensagem + '\'' +
                ", descricao='" + descricao + '\'' +
                ", caminhoImagem='" + caminhoImagem + '\'' +
                ", data=" + data +
                '}';
    }
}
