package com.pixxl.service;

import com.pixxl.model.ComentarioCli;
import com.pixxl.model.ComentarioCliImgs;
import com.pixxl.repository.ComentarioCliImgsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ComentarioCliImgService {

    @Autowired
    private ComentarioCliImgsRepository comentarioCliImgsRepository;

    @Autowired
    private ComentarioCliService comentarioCliService;

    public ComentarioCliImgs gravarComentarioComImagem(Long comentarioId, String nomeImagem) {
        ComentarioCli comentario = comentarioCliService.findById(comentarioId);
        ComentarioCliImgs cliImg = new ComentarioCliImgs(comentario, nomeImagem);
        return comentarioCliImgsRepository.save(cliImg);
    }

    public String salvarImagem(MultipartFile file, String uploadDir) throws IOException {
        File pasta = new File(uploadDir);
        if (!pasta.exists()) pasta.mkdirs();

        String nomeArquivo = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path caminho = Paths.get(uploadDir, nomeArquivo);
        Files.copy(file.getInputStream(), caminho);

        return nomeArquivo;
    }

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

    public void deletar(Long id) {
        comentarioCliImgsRepository.deleteById(id);
    }

    public ComentarioCliImgs update(Long id, ComentarioCliImgs comentarioCliImgs){
        ComentarioCliImgs alterado = findById(id);
        if (alterado != null){
            alterado.setImagem(comentarioCliImgs.getImagem());
            alterado.setComentario(comentarioCliImgs.getComentario());
            return comentarioCliImgsRepository.save(alterado);
        }
        return null;
    }
}

