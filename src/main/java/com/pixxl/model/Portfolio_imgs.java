    package com.pixxl.model;

    import jakarta.persistence.*;

    @Entity
    @Table(name= "portfolio_imgs")
    public class Portfolio_imgs {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column
        private String imagem;

        @ManyToOne(optional = false)
        @JoinColumn(name = "portfolio_id", referencedColumnName = "id", nullable = false)
        private Portfolio portfolio;

        public Portfolio_imgs() {}

        public Portfolio_imgs (Long id, Portfolio portfolio, String imagem) {
            this.id = id;
            this.portfolio = portfolio;
            this.imagem = imagem;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getImagem() {
            return imagem;
        }

        public void setImagem(String imagem) {
            this.imagem = imagem;
        }

        public Portfolio getPortfolio() {
            return portfolio;
        }

        public void setPortfolio(Portfolio portfolio) {
            this.portfolio = portfolio;
        }
    }
