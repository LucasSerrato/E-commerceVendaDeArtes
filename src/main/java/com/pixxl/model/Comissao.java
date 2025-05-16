package com.pixxl.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Comissao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mensagem;
    private LocalDate data;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }

    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
}
