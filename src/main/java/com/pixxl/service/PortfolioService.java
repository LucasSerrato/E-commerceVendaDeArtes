package com.pixxl.service;

import com.pixxl.model.Portfolio;
import com.pixxl.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    public Portfolio findById(Long id) {
        Optional<Portfolio> portfolio = portfolioRepository.findById(id);
        return portfolio.orElse(null);
    }

    public List<Portfolio> findAll() {
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
            return portfolioRepository.save(alterado);
        }
        return null;
    }
}
