package com.pixxl.service;

import com.pixxl.model.Comissao;
import com.pixxl.repository.ComissaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ComissaoService {

    @Autowired
    private ComissaoRepository comissaoRepository;

    public List<Comissao> findAll() {
        return comissaoRepository.findAll();
    }

    public Comissao findById(Long id) {
        return comissaoRepository.findById(id).orElse(null);
    }

    public Comissao save(Comissao comissao) {
        comissao.setData(LocalDate.now());
        return comissaoRepository.save(comissao);
    }

    public Comissao update(Long id, Comissao comissaoAtualizada) {
        Optional<Comissao> existente = comissaoRepository.findById(id);
        if (existente.isPresent()) {
            Comissao comissao = existente.get();
            comissao.setMensagem(comissaoAtualizada.getMensagem());

            return comissaoRepository.save(comissao);
        }
        return null;
    }

    public void delete(Long id) {
        comissaoRepository.deleteById(id);
    }
}
