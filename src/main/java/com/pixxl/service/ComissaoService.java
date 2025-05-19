package com.pixxl.service;

import com.pixxl.model.Comissao;
import com.pixxl.repository.ComissaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComissaoService {

    @Autowired
    private final ComissaoRepository repository;

    public ComissaoService(ComissaoRepository repository) {
        this.repository = repository;
    }

    public Comissao salvar(Comissao comissao) {
        return repository.save(comissao);
    }

    public List<Comissao> listar() {
        return repository.findAll();
    }

    public Optional<Comissao> buscarPorId(Long id) {
        return repository.findById(id);
    }
}
