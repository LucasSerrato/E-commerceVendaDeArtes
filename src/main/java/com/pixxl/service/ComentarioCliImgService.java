package com.pixxl.service;


import com.pixxl.model.ComentarioCli;
import com.pixxl.model.ComentarioCliImgs;
import com.pixxl.repository.ComentarioCliImgsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComentarioCliImgService {
    @Autowired
    ComentarioCliImgsRepository comentarioCliImgsRepository;

    public ComentarioCliImgs findById(Long id){
        Optional<ComentarioCliImgs> comentarioCliImgs = comentarioCliImgsRepository.findById(id);
        return comentarioCliImgs.orElse(null);
    }

    public List<ComentarioCliImgs> findAll(){
        return comentarioCliImgsRepository.findAll();
    }

    public ComentarioCliImgs gravarComentarioCliImgs(ComentarioCliImgs comentarioCliImgs){
        return comentarioCliImgsRepository.save(comentarioCliImgs);
    }

    public void deletar(Long id) {comentarioCliImgsRepository.deleteById(id);}

    public ComentarioCliImgs update(Long id, ComentarioCliImgs comentarioCliImgs){
        ComentarioCliImgs alterado = findById(id);
        if (alterado!=null){
            alterado.setImagem(comentarioCliImgs.getImagem());
            alterado.setComentario(comentarioCliImgs.getComentario());

            return  comentarioCliImgsRepository.save(alterado);
        }
        return null;
    }


}
