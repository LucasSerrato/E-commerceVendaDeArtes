package com.pixxl.controller;

import com.pixxl.model.AceitarComissao;
import com.pixxl.service.AceitarComissaoService;
import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("api/aceitarcomissao")
public class AceitarComissaoController {
    @Autowired private AceitarComissaoService aceitarComissaoService;

    @GetMapping("/{id}")
    public ResponseEntity<AceitarComissao> findById(@PathVariable Long id) {
        AceitarComissao aceitarComissao = aceitarComissaoService.findById(id);
        if (aceitarComissao != null) {
            return ResponseEntity.ok(aceitarComissao);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<AceitarComissao>> findAll() {
        List<AceitarComissao> lista = aceitarComissaoService.findAll();
        return ResponseEntity.ok(lista);
    }

    @PostMapping
    public ResponseEntity<AceitarComissao> gravarMensagemComissao(
            @RequestBody AceitarComissao aceitarComissao) {
        AceitarComissao salvo =
                aceitarComissaoService.gravarMensagemComissao(aceitarComissao);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(salvo.getId())
                .toUri();
        return ResponseEntity.created(uri).body(salvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        aceitarComissaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<AceitarComissao> update(
            @PathVariable Long id, @RequestBody AceitarComissao aceitarComissao) {
        AceitarComissao alterado =
                aceitarComissaoService.update(id, aceitarComissao);
        if (alterado != null) {
            return ResponseEntity.ok(alterado);
        }
        return ResponseEntity.notFound().build();
    }
}
