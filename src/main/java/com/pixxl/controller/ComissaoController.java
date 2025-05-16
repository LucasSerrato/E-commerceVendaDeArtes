package com.pixxl.controller;

import com.pixxl.Dto.ComissaoDTO;
import com.pixxl.model.Comissao;
import com.pixxl.service.ComissaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comissoes")
public class ComissaoController {

    @Autowired
    private ComissaoService comissaoService;

    @GetMapping
    public ResponseEntity<List<ComissaoDTO>> listarComissoes() {
        List<ComissaoDTO> lista = comissaoService.findAll().stream()
                .map(ComissaoDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comissao> buscarPorId(@PathVariable Long id) {
        Comissao comissao = comissaoService.findById(id);
        if (comissao != null) {
            return ResponseEntity.ok(comissao);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Comissao> salvarComissao(@RequestBody Comissao comissao) {
        Comissao salva = comissaoService.save(comissao);
        return ResponseEntity.created(URI.create("/api/comissoes/" + salva.getId())).body(salva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comissao> atualizarComissao(@PathVariable Long id, @RequestBody Comissao comissao) {
        Comissao atualizada = comissaoService.update(id, comissao);
        if (atualizada != null) {
            return ResponseEntity.ok(atualizada);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarComissao(@PathVariable Long id) {
        comissaoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
