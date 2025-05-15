package com.pixxl.controller;


import com.pixxl.model.ComentarioCli;
import com.pixxl.model.MensagensChat;
import com.pixxl.service.MensagensChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("api/mensagemchat")
public class MensagemChatController {

    @Autowired
    private MensagensChatService mensagensChatService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<MensagensChat> findById(@PathVariable Long id) {
        MensagensChat mensagensChat = mensagensChatService.findById(id);
        return ResponseEntity.ok().body(mensagensChat);
    }

    @PostMapping
    public ResponseEntity<MensagensChat> gravarMensagensChat(@RequestBody MensagensChat mensagensChat) {
        mensagensChat = mensagensChatService.gravarMensagensChat(mensagensChat);
        URI uri =  ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(mensagensChat.getId()).toUri();
        return ResponseEntity.created(uri).body(mensagensChat);
    }
}
