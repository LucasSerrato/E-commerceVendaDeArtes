package com.pixxl.controller;


import com.pixxl.model.ComentarioCli;
import com.pixxl.model.ComentarioCliImgs;
import com.pixxl.service.ComentarioCliImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/comentariocliimg")
public class ComentarioCliImgsController {

    @Autowired
    private ComentarioCliImgService comentarioCliImgService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<ComentarioCliImgs> findById(@PathVariable Long id) {
        ComentarioCliImgs comentarioCliImgs = comentarioCliImgService.findById(id);
        return ResponseEntity.ok().body(comentarioCliImgs);
    }

    @PostMapping
    public ResponseEntity<ComentarioCliImgs> gravarComentarioCliImgs(@RequestBody ComentarioCliImgs comentarioCliImgs) {
        comentarioCliImgs = comentarioCliImgService.gravarComentarioCliImgs(comentarioCliImgs);
        URI uri =  ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(comentarioCliImgs.getId()).toUri();
        return ResponseEntity.created(uri).body(comentarioCliImgs);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        comentarioCliImgService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ComentarioCliImgs> update(@PathVariable Long id, @RequestBody ComentarioCliImgs comentarioCliImgs){
        ComentarioCliImgs alterado = comentarioCliImgService.update(id, comentarioCliImgs);
        return ResponseEntity.ok().body(alterado);
    }

}
