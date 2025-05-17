package com.pixxl.controller;

import com.pixxl.model.MensagensChat;
import com.pixxl.service.MensagensChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/mensagemchat")
public class MensagemChatController {

    private final String uploadDir = "uploads/mensagens/";

    @Autowired
    private MensagensChatService mensagensChatService;

    @PostMapping("/{id}/imagem")
    public ResponseEntity<MensagensChat> uploadImagem(@PathVariable Long id, @RequestParam("imagem") MultipartFile imagem) throws IOException {
        MensagensChat salvo = mensagensChatService.salvarImagemNaMensagem(id, imagem, uploadDir);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MensagensChat> findById(@PathVariable Long id) {
        MensagensChat mensagensChat = mensagensChatService.findById(id);
        if (mensagensChat != null) {
            return ResponseEntity.ok(mensagensChat);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<MensagensChat>> findAll() {
        List<MensagensChat> lista = mensagensChatService.findAll();
        return ResponseEntity.ok(lista);
    }

    @PostMapping
    public ResponseEntity<MensagensChat> gravarMensagensChat(@RequestBody MensagensChat mensagensChat) {
        MensagensChat salvo = mensagensChatService.gravarMensagensChat(mensagensChat);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(salvo.getId())
                .toUri();
        return ResponseEntity.created(uri).body(salvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        mensagensChatService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

