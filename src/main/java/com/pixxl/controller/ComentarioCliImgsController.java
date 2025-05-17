package com.pixxl.controller;

import com.pixxl.model.ComentarioCliImgs;
import com.pixxl.service.ComentarioCliImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/comentariocliimgs")
public class ComentarioCliImgsController {

    private final String uploadDir = "uploads/comentarios/";

    @Autowired
    private ComentarioCliImgService comentarioCliImgService;

    @PostMapping("/{id}/upload")
    public ResponseEntity<ComentarioCliImgs> uploadImagem(
            @PathVariable Long id,
            @RequestParam("imagem") MultipartFile imagem) throws IOException {

        ComentarioCliImgs salvo = comentarioCliImgService.salvarImagemNoComentario(id, imagem, uploadDir);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(salvo.getId()).toUri();

        return ResponseEntity.created(uri).body(salvo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComentarioCliImgs> findById(@PathVariable Long id) {
        ComentarioCliImgs comentarioCliImgs = comentarioCliImgService.findById(id);
        if (comentarioCliImgs != null) {
            return ResponseEntity.ok(comentarioCliImgs);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<ComentarioCliImgs>> findAll() {
        List<ComentarioCliImgs> lista = comentarioCliImgService.findAll();
        return ResponseEntity.ok(lista);
    }

    @PostMapping
    public ResponseEntity<ComentarioCliImgs> gravarComentarioCliImgs(@RequestBody ComentarioCliImgs comentarioCliImgs) {
        ComentarioCliImgs salvo = comentarioCliImgService.gravarComentarioCliImgs(comentarioCliImgs);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(salvo.getId())
                .toUri();
        return ResponseEntity.created(uri).body(salvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        comentarioCliImgService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComentarioCliImgs> update(@PathVariable Long id, @RequestBody ComentarioCliImgs comentarioCliImgs) {
        ComentarioCliImgs alterado = comentarioCliImgService.update(id, comentarioCliImgs);
        if (alterado != null) {
            return ResponseEntity.ok(alterado);
        }
        return ResponseEntity.notFound().build();
    }
}

