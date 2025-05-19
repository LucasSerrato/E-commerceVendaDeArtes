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
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/portfolioimgs")
@CrossOrigin(origins = "*")
public class PortfolioImgsController {

    private final String uploadDir = System.getProperty("user.dir") + "/uploads/portfolio/";

    @Autowired
    private PortfolioImgsService portfolioImgsService;

    @PostMapping("/{id}/upload")
    public ResponseEntity < List < Portfolio_imgs >> uploadImagens(
            @PathVariable Long id,
            @RequestParam("imagem") MultipartFile[] imagens) throws IOException {

        List < Portfolio_imgs > imagensSalvas = portfolioImgsService.salvarVariasImagensNoPortfolio(id, imagens);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
        return ResponseEntity.created(uri).body(imagensSalvas);
    }

    @GetMapping("/{id}")
    public ResponseEntity < Portfolio_imgs > findById(@PathVariable Long id) {
        Portfolio_imgs portfolio_imgs = portfolioImgsService.findById(id);
        if (portfolio_imgs != null) {
            return ResponseEntity.ok(portfolio_imgs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/imagem/{nomeArquivo:.+}")
    public ResponseEntity < byte[] > servirImagem(@PathVariable String nomeArquivo) throws IOException {
        System.out.println("Tentando servir imagem: " + nomeArquivo);
        Path caminhoImagem = Paths.get(uploadDir, nomeArquivo);
        System.out.println("Caminho absoluto: " + caminhoImagem.toAbsolutePath());

        if (!Files.exists(caminhoImagem)) {
            System.out.println("Imagem NÃO encontrada");
            return ResponseEntity.notFound().build();
        }

        byte[] imagemBytes = Files.readAllBytes(caminhoImagem);
        String contentType = Files.probeContentType(caminhoImagem);
        if (contentType == null) contentType = "image/jpeg";

        return ResponseEntity
                .ok()
                .header("Content-Type", contentType)
                .body(imagemBytes);
    }

    @GetMapping("/portfolio/{portfolioId}")
    public ResponseEntity < List < Portfolio_imgs >> findByPortfolioId(@PathVariable Long portfolioId) {
        List < Portfolio_imgs > imagens = portfolioImgsService.findByPortfolioId(portfolioId);
        return ResponseEntity.ok(imagens);
    }

    @GetMapping
    public ResponseEntity < List < Portfolio_imgs >> findAll() {
        List < Portfolio_imgs > portfolio_imgsList = portfolioImgsService.findAll();
        return ResponseEntity.ok(portfolio_imgsList);
    }

    @GetMapping("/artista/{artistaId}")
    public ResponseEntity < List < Portfolio_imgs >> findImagensByArtistaId(@PathVariable Long artistaId) {
        List < Portfolio_imgs > imagens = portfolioImgsService.findImagensByArtistaId(artistaId);
        return ResponseEntity.ok(imagens);
    }

    @GetMapping("/filtro")
    public ResponseEntity<List<Portfolio_imgs>> filtrarPorTipoArte(@RequestParam(required = false) String tipo) {
        List<Portfolio_imgs> imagensFiltradas = portfolioImgsService.findByTipoArte(tipo);
        return ResponseEntity.ok(imagensFiltradas);
    }

    @PostMapping
    public ResponseEntity < Portfolio_imgs > gravarPortfolioImg(@RequestBody Portfolio_imgs portfolio_imgs) {
        Portfolio_imgs salvo = portfolioImgsService.gravarPortfolioImgs(portfolio_imgs);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(salvo.getId())
                .toUri();
        return ResponseEntity.created(uri).body(salvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity < Void > deletar(@PathVariable Long id) {
        portfolioImgsService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity < Portfolio_imgs > update(@PathVariable Long id, @RequestBody Portfolio_imgs portfolio_imgs) {
        Portfolio_imgs alterado = portfolioImgsService.update(id, portfolio_imgs);
        if (alterado != null) {
            return ResponseEntity.ok(alterado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}