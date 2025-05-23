package com.pixxl.service;

import com.pixxl.model.ComentarioCli;
import com.pixxl.repository.ComentarioCliRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComentarioCliService {
    @Autowired private ComentarioCliRepository comentarioCliRepository;

    public ComentarioCli findById(Long id) {
        Optional<ComentarioCli> comentarioCli =
                comentarioCliRepository.findById(id);
        return comentarioCli.orElse(null);
    }

    public List<ComentarioCli> findAll() {
        return comentarioCliRepository.findAll();
    }

    public ComentarioCli gravarComentarioCli(ComentarioCli comentarioCli) {
        return comentarioCliRepository.save(comentarioCli);
    }

    public void deletar(Long id) {
        comentarioCliRepository.deleteById(id);
    }

    public ComentarioCli update(Long id, ComentarioCli comentarioCli) {
        ComentarioCli alterado = findById(id);
        if (alterado != null) {
            alterado.setDescricao(comentarioCli.getDescricao());

            return comentarioCliRepository.save(alterado);
        }
        return null;
    }
}
