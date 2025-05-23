package com.pixxl.controller;

import com.pixxl.model.ImagensPainel;
import com.pixxl.service.ImagensPainelService;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class ImagensPainelController {
    private final String uploadDir = "uploads/painel/";

    @Autowired private ImagensPainelService imagensPainelService;

    @PostMapping("/{comissaoId}/upload")
    public ResponseEntity<ImagensPainel> uploadImagem(
            @PathVariable Long comissaoId,
            @RequestParam("imagem") MultipartFile imagem) throws IOException {
        ImagensPainel salvo =
                imagensPainelService.salvarImagem(comissaoId, imagem, uploadDir);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(salvo.getId())
                .toUri();
        return ResponseEntity.created(uri).body(salvo);
    }

    @GetMapping("/por-comissao/{comissaoId}")
    public ResponseEntity<List<ImagensPainel>> listarPorComissao(
            @PathVariable Long comissaoId) {
        return ResponseEntity.ok(imagensPainelService.findByComissaoId(comissaoId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImagensPainel> buscarPorId(@PathVariable Long id) {
        ImagensPainel imagem = imagensPainelService.findById(id);
        return imagem != null ? ResponseEntity.ok(imagem)
                : ResponseEntity.notFound().build();
    }
    @GetMapping("/arquivo/{nomeImagem}")
    public ResponseEntity<byte[]> buscarArquivo(@PathVariable String nomeImagem)
            throws IOException {
        Path caminho = Paths.get(uploadDir + nomeImagem);

        if (!Files.exists(caminho)) {
            return ResponseEntity.notFound().build();
        }

        byte[] imagem = Files.readAllBytes(caminho);
        HttpHeaders headers = new HttpHeaders();

        String contentType = Files.probeContentType(caminho);
        headers.setContentType(MediaType.parseMediaType(contentType));

        // download com o nome do arquivo original
        headers.setContentDispositionFormData("attachment", nomeImagem);

        return ResponseEntity.ok().headers(headers).body(imagem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        imagensPainelService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImagensPainel> atualizar(
            @PathVariable Long id, @RequestBody ImagensPainel novaImagem) {
        ImagensPainel atualizada = imagensPainelService.update(id, novaImagem);
        return atualizada != null ? ResponseEntity.ok(atualizada)
                : ResponseEntity.notFound().build();
    }
}
