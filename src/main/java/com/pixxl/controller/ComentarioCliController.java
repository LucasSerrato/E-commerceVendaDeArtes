package com.pixxl.controller;

import com.pixxl.model.ComentarioCli;
import com.pixxl.service.ComentarioCliService;
import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/comentariocli")
@CrossOrigin(origins = "*")
public class ComentarioCliController {
    @Autowired private ComentarioCliService comentarioCliService;

    @GetMapping("/{id}")
    public ResponseEntity<ComentarioCli> findById(@PathVariable Long id) {
        ComentarioCli comentarioCli = comentarioCliService.findById(id);
        if (comentarioCli != null) {
            return ResponseEntity.ok(comentarioCli);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<ComentarioCli>> findAll() {
        List<ComentarioCli> lista = comentarioCliService.findAll();
        return ResponseEntity.ok(lista);
    }

    @PostMapping
    public ResponseEntity<ComentarioCli> gravarComentarioCli(
            @RequestBody ComentarioCli comentarioCli) {
        ComentarioCli salvo =
                comentarioCliService.gravarComentarioCli(comentarioCli);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(salvo.getId())
                .toUri();
        return ResponseEntity.created(uri).body(salvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        comentarioCliService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComentarioCli> update(
            @PathVariable Long id, @RequestBody ComentarioCli comentarioCli) {
        ComentarioCli alterado = comentarioCliService.update(id, comentarioCli);
        if (alterado != null) {
            return ResponseEntity.ok(alterado);
        }
        return ResponseEntity.notFound().build();
    }
}
