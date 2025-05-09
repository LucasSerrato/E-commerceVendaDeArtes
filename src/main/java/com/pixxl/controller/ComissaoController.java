package com.pixxl.controller;

import com.pixxl.dto.ComissaoDTO;
import com.pixxl.model.Comissao;
import com.pixxl.repository.ComissaoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comissoes")
public class ComissaoController {

    private final ComissaoRepository comissaoRepository;

    public ComissaoController(ComissaoRepository comissaoRepository) {
        this.comissaoRepository = comissaoRepository;
    }

    @GetMapping
    public List<ComissaoDTO> listarComissoes() {
        List<Comissao> comissoes = comissaoRepository.findAll();
        return comissoes.stream()
                .map(ComissaoDTO::new)
                .collect(Collectors.toList());
    }

    @PostMapping
    public Comissao salvarComissao(@RequestBody Comissao comissao) {
        comissao.setData(java.time.LocalDate.now());
        return comissaoRepository.save(comissao);
    }
}
