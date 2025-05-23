package com.pixxl.model;

import jakarta.persistence.*;

@Entity
@Table(name = "comentario_cli_imgs")
public class ComentarioCliImgs {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(
            name = "comentario_cli_id", referencedColumnName = "id", nullable = false)
    private ComentarioCli comentario;

    @Column() private String imagem;

    public ComentarioCliImgs() {}

    public ComentarioCliImgs(ComentarioCli comentario, String imagem) {
        this.comentario = comentario;
        this.imagem = imagem;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ComentarioCli getComentario() {
        return comentario;
    }

    public void setComentario(ComentarioCli comentario) {
        this.comentario = comentario;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }
}
