package com.pixxl.controller;

import com.pixxl.model.Portfolio;
import com.pixxl.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/portfolio")
@CrossOrigin(origins = "*")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @GetMapping("/{id}")
    public ResponseEntity < Portfolio > findById(@PathVariable Long id) {
        Portfolio portfolio = portfolioService.findById(id);
        if (portfolio != null) {
            return ResponseEntity.ok(portfolio);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/artista/{id}")
    public ResponseEntity < List < Portfolio >> findByArtistaId(@PathVariable Long id) {
        List < Portfolio > portfolios = portfolioService.findAllByArtistaId(id);
        if (portfolios != null && !portfolios.isEmpty()) {
            return ResponseEntity.ok(portfolios);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity < List < Portfolio >> findAll() {
        return ResponseEntity.ok(portfolioService.findAll());
    }

    @PostMapping
    public ResponseEntity < Portfolio > gravarPortfolio(@RequestBody Portfolio portfolio) {
        Portfolio salvo = portfolioService.gravarPortfolio(portfolio);
        return ResponseEntity.ok(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity < Portfolio > update(@PathVariable Long id, @RequestBody Portfolio portfolio) {
        Portfolio atualizado = portfolioService.update(id, portfolio);
        if (atualizado != null) {
            return ResponseEntity.ok(atualizado);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity < Void > deletarPortfolio(@PathVariable Long id) {
        portfolioService.deletarPortfolioCompleto(id);
        return ResponseEntity.noContent().build();
    }

}