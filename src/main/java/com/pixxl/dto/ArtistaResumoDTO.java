package com.pixxl.dto;

import com.pixxl.model.Cliente;

public class ArtistaResumoDTO {
    private Long id;
    private String nome;
    private String email;
    private boolean artista;

    public ArtistaResumoDTO(Cliente artista) {
        if (artista != null) {
            this.id = artista.getId();
            this.nome = artista.getNome();
            this.email = artista.getEmail();
            this.artista = artista.isArtista();
        }
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public boolean isArtista() { return artista; }
}

