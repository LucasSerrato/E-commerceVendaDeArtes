package com.pixxl.service;

import com.pixxl.model.MensagensChat;
import com.pixxl.repository.MensagensChatRepository;
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
public class MensagensChatService {

    @Autowired
    private MensagensChatRepository mensagensChatRepository;

    public MensagensChat findById(Long id) {
        Optional<MensagensChat> mensagensChat = mensagensChatRepository.findById(id);
        return mensagensChat.orElse(null);
    }

    public List<MensagensChat> findAll() {
        return mensagensChatRepository.findAll();
    }

    public MensagensChat gravarMensagensChat(MensagensChat mensagensChat) {
        return mensagensChatRepository.save(mensagensChat);
    }

    public void deletar(Long id) {
        mensagensChatRepository.deleteById(id);
    }

    public MensagensChat salvarImagemNaMensagem(Long idMensagem, MultipartFile file, String uploadDir) throws IOException {
        MensagensChat mensagem = findById(idMensagem);
        if (mensagem == null) {
            throw new RuntimeException("Mensagem não encontrada para o ID: " + idMensagem);
        }

        File pasta = new File(uploadDir);
        if (!pasta.exists()) pasta.mkdirs();

        String nomeArquivo = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path caminho = Paths.get(uploadDir, nomeArquivo);
        Files.copy(file.getInputStream(), caminho);

        mensagem.setImagem(nomeArquivo);
        return mensagensChatRepository.save(mensagem);
    }
}


