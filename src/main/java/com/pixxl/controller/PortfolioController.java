package com.pixxl.controller;

import com.pixxl.model.ComentarioCli;
import com.pixxl.model.Portfolio;
import com.pixxl.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("api/portfolio")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Portfolio> findById(@PathVariable Long id) {
        Portfolio portfolio = portfolioService.findById(id);
        return ResponseEntity.ok().body(portfolio);
    }

    @PostMapping
    public ResponseEntity<Portfolio> gravarPortfolio(@RequestBody Portfolio portfolio) {
        portfolio = portfolioService.gravarPortfolio(portfolio);
        URI uri =  ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(portfolio.getId()).toUri();
        return ResponseEntity.created(uri).body(portfolio);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        portfolioService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Portfolio> update(@PathVariable Long id, @RequestBody Portfolio portfolio){
        Portfolio alterado = portfolioService.update(id, portfolio);
        return ResponseEntity.ok().body(alterado);
    }

}
