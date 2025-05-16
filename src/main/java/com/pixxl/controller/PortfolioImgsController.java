package com.pixxl.controller;

import com.pixxl.model.Portfolio_imgs;
import com.pixxl.service.PortfolioImgsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/portfolioimgs")
public class PortfolioImgsController {

    private final String uploadDir = "uploads/portfolio/";

    @Autowired
    private PortfolioImgsService portfolioImgsService;

    @PostMapping("/upload")
    public ResponseEntity<Portfolio_imgs> uploadImagem(@RequestParam("imagem") MultipartFile imagem) throws IOException {
        String nomeImagem = portfolioImgsService.salvarImagem(imagem, uploadDir);
        Portfolio_imgs salvo = portfolioImgsService.gravarImagem(nomeImagem);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(salvo.getId()).toUri();

        return ResponseEntity.created(uri).body(salvo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Portfolio_imgs> findById(@PathVariable Long id) {
        Portfolio_imgs portfolio_imgs = portfolioImgsService.findById(id);
        if (portfolio_imgs != null) {
            return ResponseEntity.ok(portfolio_imgs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Portfolio_imgs>> findAll() {
        List<Portfolio_imgs> portfolio_imgsList = portfolioImgsService.findAll();
        return ResponseEntity.ok(portfolio_imgsList);
    }

    @PostMapping
    public ResponseEntity<Portfolio_imgs> gravarPortfolioImg(@RequestBody Portfolio_imgs portfolio_imgs) {
        Portfolio_imgs salvo = portfolioImgsService.gravarPortfolioImgs(portfolio_imgs);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(salvo.getId())
                .toUri();
        return ResponseEntity.created(uri).body(salvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        portfolioImgsService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Portfolio_imgs> update(@PathVariable Long id, @RequestBody Portfolio_imgs portfolio_imgs) {
        Portfolio_imgs alterado = portfolioImgsService.update(id, portfolio_imgs);
        if (alterado != null) {
            return ResponseEntity.ok(alterado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}



