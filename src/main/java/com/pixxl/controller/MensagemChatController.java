package com.pixxl.controller;

import com.pixxl.dto.ConversaDTO;
import com.pixxl.dto.MensagemDTO;
import com.pixxl.model.Cliente;
import com.pixxl.model.MensagensChat;
import com.pixxl.repository.ClienteRepository;
import com.pixxl.service.MensagensChatService;
import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/mensagemchat")
public class MensagemChatController {
    private final String uploadDir = "uploads/mensagens/";

    @Autowired private MensagensChatService mensagensChatService;

    @Autowired private ClienteRepository clienteRepository;

    @PostMapping("/{id}/imagem")
    public ResponseEntity<MensagensChat> uploadImagem(@PathVariable Long id,
                                                      @RequestParam("imagem") MultipartFile imagem) throws IOException {
        MensagensChat salvo =
                mensagensChatService.salvarImagemNaMensagem(id, imagem, uploadDir);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MensagensChat> findById(@PathVariable Long id) {
        MensagensChat mensagensChat = mensagensChatService.findById(id);
        if (mensagensChat == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(mensagensChat);
    }

    @GetMapping
    public ResponseEntity<List<MensagensChat>> findAll() {
        return ResponseEntity.ok(mensagensChatService.findAll());
    }

    @GetMapping("/conversa/{conversaId}")
    public ResponseEntity<List<MensagensChat>> findByConversaId(
            @PathVariable Long conversaId) {
        return ResponseEntity.ok(mensagensChatService.findByConversaId(conversaId));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<ConversaDTO>> getConversasDoUsuario(
            @PathVariable Long usuarioId) {
        List<ConversaDTO> conversas =
                mensagensChatService.buscarConversasDoUsuario(usuarioId);
        return ResponseEntity.ok(conversas);
    }

    @PostMapping
    public ResponseEntity<MensagensChat> gravarMensagensChat(
            @RequestBody MensagemDTO mensagemDTO) {
        // fazer verificação clara e retornar erro HTTP 404 se remetente ou
        // destinatário não existir
        Cliente remetente =
                clienteRepository.findById(mensagemDTO.getRemetenteId())
                        .orElseThrow(
                                () -> new RuntimeException("Remetente não encontrado"));

        Cliente destinatario =
                clienteRepository.findById(mensagemDTO.getDestinatarioId())
                        .orElseThrow(
                                () -> new RuntimeException("Destinatário não encontrado"));

        // logar os IDs recebidos
        System.out.println(
                "Remetente ID recebido: " + mensagemDTO.getRemetenteId());
        System.out.println(
                "Destinatário ID recebido: " + mensagemDTO.getDestinatarioId());

        MensagensChat mensagensChat = new MensagensChat();
        mensagensChat.setRemetente(remetente);
        mensagensChat.setDestinatario(destinatario);
        mensagensChat.setConversaId(mensagemDTO.getConversaId());
        mensagensChat.setMensagem(mensagemDTO.getMensagem());
        mensagensChat.setImagem(mensagemDTO.getImagem());
        mensagensChat.setDataEnvio(LocalDateTime.now());

        MensagensChat salvo =
                mensagensChatService.gravarMensagensChat(mensagensChat);

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

    @DeleteMapping("/conversa/{conversaId}")
    public ResponseEntity<Void> deletarConversa(@PathVariable Long conversaId) {
        mensagensChatService.deletarPorConversaId(conversaId);
        return ResponseEntity.noContent().build();
    }
}
