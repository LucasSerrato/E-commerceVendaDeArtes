package com.pixxl.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "mensagens_chat")
public class MensagensChat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "remetente_id", referencedColumnName = "id", nullable = false)
    private Cliente remetente;

    @ManyToOne(optional = false)
    @JoinColumn(name = "destinatario_id", referencedColumnName = "id", nullable = false)
    private Cliente destinatario;

    @Column(name = "conversa_id", nullable = false)
    private Long conversaId;

    @Column(columnDefinition = "TEXT")
    private String mensagem;

    @Column
    private String imagem;

    @CreationTimestamp
    @Column(name = "data_envio", updatable = false)
    private LocalDateTime dataEnvio;

    public MensagensChat() {}

    public MensagensChat(Long id, Cliente remetente, Cliente destinatario, Long conversaId, String mensagem, String imagem, LocalDateTime dataEnvio) {
        this.id = id;
        this.remetente = remetente;
        this.destinatario = destinatario;
        this.conversaId = conversaId;
        this.mensagem = mensagem;
        this.imagem = imagem;
        this.dataEnvio = dataEnvio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cliente getRemetente() {
        return remetente;
    }

    public void setRemetente(Cliente remetente) {
        this.remetente = remetente;
    }

    public Cliente getDestinatario() {
        return destinatario;
    }

    public void setDestinatario(Cliente destinatario) {
        this.destinatario = destinatario;
    }

    public Long getConversaId() {
        return conversaId;
    }

    public void setConversaId(Long conversaId) {
        this.conversaId = conversaId;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public LocalDateTime getDataEnvio() {
        return dataEnvio;
    }

    public void setDataEnvio(LocalDateTime dataEnvio) {
        this.dataEnvio = dataEnvio;
    }
}
