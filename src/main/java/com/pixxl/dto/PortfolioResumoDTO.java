package com.pixxl.dto;

import com.pixxl.model.Portfolio;
import java.math.BigDecimal;

public class PortfolioResumoDTO {
    private Long id;
    private String tipoArte;
    private BigDecimal preco;

    public PortfolioResumoDTO(Portfolio portfolio) {
        this.id = portfolio.getId();
        this.tipoArte = portfolio.getTipo_arte();
        this.preco = portfolio.getPreco();
    }

    public Long getId() {
        return id;
    }
    public String getTipoArte() {
        return tipoArte;
    }
    public BigDecimal getPreco() {
        return preco;
    }
}
