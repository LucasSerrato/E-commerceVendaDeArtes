package com.pixxl.service;

import com.pixxl.model.MensagensChat;
import com.pixxl.repository.MensagensChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
}

