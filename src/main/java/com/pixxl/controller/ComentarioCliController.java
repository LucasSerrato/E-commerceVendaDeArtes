package com.pixxl.controller;


import com.pixxl.model.ComentarioCli;
import com.pixxl.service.ComentarioCliService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/comentariocli")
public class ComentarioCliController {

    @Autowired
    private ComentarioCliService comentarioCliService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<ComentarioCli> findById(@PathVariable Long id) {
        ComentarioCli comentarioCli = comentarioCliService.findById(id);
        return ResponseEntity.ok().body(comentarioCli);
    }

    @PostMapping
    public ResponseEntity<ComentarioCli> gravarComentarioCli(@RequestBody ComentarioCli comentarioCli) {
        comentarioCli = comentarioCliService.gravarComentarioCli(comentarioCli);
        URI uri =  ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(comentarioCli.getId()).toUri();
        return ResponseEntity.created(uri).body(comentarioCli);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        comentarioCliService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ComentarioCli> update(@PathVariable Long id, @RequestBody ComentarioCli comentarioCli){
        ComentarioCli alterado = comentarioCliService.update(id, comentarioCli);
        return ResponseEntity.ok().body(alterado);
    }
}
