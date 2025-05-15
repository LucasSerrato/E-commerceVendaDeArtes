package com.pixxl.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name= "comentario_cli")
public class ComentarioCli {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cliente_id", referencedColumnName = "id", nullable = false)
    private Cliente cliente;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "data_post", nullable = false, updatable = false)
    private LocalDateTime dataPost;

    public ComentarioCli() {
        this.dataPost = LocalDateTime.now();
    }

    public ComentarioCli(Cliente cliente, String descricao) {
        this.cliente = cliente;
        this.descricao = descricao;
        this.dataPost = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDateTime getDataPost() {
        return dataPost;
    }

    public void setDataPost(LocalDateTime dataPost) {
        this.dataPost = dataPost;
    }
}
