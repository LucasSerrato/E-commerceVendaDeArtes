package com.pixxl.service;

import com.pixxl.model.Portfolio;
import com.pixxl.model.Portfolio_imgs;
import com.pixxl.repository.PortfolioImgsRepository;
import com.pixxl.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private PortfolioImgsRepository portfolioImgsRepository;

    public Portfolio findById(Long id) {
        Optional < Portfolio > portfolio = portfolioRepository.findById(id);
        return portfolio.orElse(null);
    }

    public List < Portfolio > findAll() {
        return portfolioRepository.findAll();
    }

    public Portfolio gravarPortfolio(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    public void deletar(Long id) {
        portfolioRepository.deleteById(id);
    }

    public Portfolio update(Long id, Portfolio portfolio) {
        Portfolio alterado = findById(id);
        if (alterado != null) {
            alterado.setBio(portfolio.getBio());
            alterado.setPrazo(portfolio.getPrazo());
            alterado.setPreco(portfolio.getPreco());
            alterado.setTipo_arte(portfolio.getTipo_arte());
            alterado.setLink(portfolio.getLink());
            return portfolioRepository.save(alterado);
        }
        return null;
    }

    public List < Portfolio > findAllByArtistaId(Long id) {
        return portfolioRepository.findAllByArtistaId(id);
    }

    public void deletarPortfolioCompleto(Long portfolioId) {
        // Apaga imagens associadas
        List < Portfolio_imgs > imagens = portfolioImgsRepository.findByPortfolioId(portfolioId);
        portfolioImgsRepository.deleteAll(imagens);

        // Apaga o portfólio
        portfolioRepository.deleteById(portfolioId);
    }
}