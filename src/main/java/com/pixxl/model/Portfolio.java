package com.pixxl.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "portfolio")
public class Portfolio {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

    @Column private String bio;

    @Column private String tipo_arte;

    @Column private BigDecimal preco;

    @Column private int prazo;

    @Column private String link;

    @ManyToOne(optional = false)
    @JoinColumn(
            name = "artista_id", referencedColumnName = "id", nullable = false)
    private Cliente artista;

    public Portfolio() {}

    public Portfolio(Long id, String bio, String tipo_arte, BigDecimal preco,
                     int prazo, Cliente artista, String link) {
        this.id = id;
        this.bio = bio;
        this.tipo_arte = tipo_arte;
        this.preco = preco;
        this.prazo = prazo;
        this.artista = artista;
        this.link = link;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getTipo_arte() {
        return tipo_arte;
    }

    public void setTipo_arte(String tipo_arte) {
        this.tipo_arte = tipo_arte;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public int getPrazo() {
        return prazo;
    }

    public void setPrazo(int prazo) {
        this.prazo = prazo;
    }

    public Cliente getArtista() {
        return artista;
    }

    public void setArtista(Cliente artista) {
        this.artista = artista;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
