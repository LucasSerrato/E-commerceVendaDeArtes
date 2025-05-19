package com.pixxl.model;


import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class AceitarComissao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "comissao_id", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name = "fk_aceitar_comissao_comissao"))
    private Comissao comissao;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valor;

    @Lob
    private String mensagem;

    @Column(name = "data_aceite", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dataAceite;

    public AceitarComissao(){
        this.dataAceite = LocalDateTime.now();
    }

    public AceitarComissao(Comissao comissao, BigDecimal valor, String mensagem) {

        this.comissao = comissao;
        this.valor = valor;
        this.mensagem = mensagem;
        this.dataAceite = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Comissao getComissao() {
        return comissao;
    }

    public void setComissao(Comissao comissao) {
        this.comissao = comissao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public LocalDateTime getDataAceite() {
        return dataAceite;
    }

    public void setDataAceite(LocalDateTime dataAceite) {
        this.dataAceite = dataAceite;
    }
}
