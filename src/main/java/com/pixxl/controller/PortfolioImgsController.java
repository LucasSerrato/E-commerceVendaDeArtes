package com.pixxl.controller;


import com.pixxl.model.ComentarioCli;
import com.pixxl.model.Portfolio_imgs;
import com.pixxl.service.PortfolioImgsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("api/portfolioimg")
public class PortfolioImgsController {
    @Autowired
    private PortfolioImgsService portfolioImgsService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Portfolio_imgs> findById(@PathVariable Long id) {
        Portfolio_imgs portfolio_imgs = portfolioImgsService.findById(id);
        return ResponseEntity.ok().body(portfolio_imgs);
    }

    @PostMapping
    public ResponseEntity<Portfolio_imgs> gravarPortfolioImg(@RequestBody Portfolio_imgs portfolio_imgs) {
        portfolio_imgs = portfolioImgsService.gravarPortfolioImgs(portfolio_imgs);
        URI uri =  ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(portfolio_imgs.getId()).toUri();
        return ResponseEntity.created(uri).body(portfolio_imgs);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        portfolioImgsService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Portfolio_imgs> update(@PathVariable Long id, @RequestBody Portfolio_imgs portfolio_imgs){
        Portfolio_imgs alterado = portfolioImgsService.update(id, portfolio_imgs);
        return ResponseEntity.ok().body(alterado);
    }

}


