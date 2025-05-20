package com.pixxl.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private boolean artista;

    @Column
    private String imagem;

    public Cliente() {}

    public Cliente(Long id, String nome, String email, String senha, boolean artista, String imagem) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.artista = artista;
        this.imagem = imagem;
    }

    // Getters e Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }

    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }

    public void setSenha(String senha) { this.senha = senha; }

    public boolean isArtista() { return artista; }

    public void setArtista(boolean artista) { this.artista = artista; }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }
}
