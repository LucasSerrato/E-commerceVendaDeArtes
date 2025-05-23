package com.pixxl.service;

import com.pixxl.dto.ConversaDTO;
import com.pixxl.model.Cliente;
import com.pixxl.model.MensagensChat;
import com.pixxl.repository.MensagensChatRepository;
import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MensagensChatService {
    @Autowired private MensagensChatRepository mensagensChatRepository;

    public MensagensChat findById(Long id) {
        return mensagensChatRepository.findById(id).orElse(null);
    }

    public List<MensagensChat> findAll() {
        return mensagensChatRepository.findAll();
    }

    public List<MensagensChat> findByConversaId(Long conversaId) {
        return mensagensChatRepository.findByConversaIdOrderByDataEnvioAsc(
                conversaId);
    }

    public MensagensChat gravarMensagensChat(MensagensChat mensagem) {
        return mensagensChatRepository.save(mensagem);
    }

    public void deletar(Long id) {
        mensagensChatRepository.deleteById(id);
    }

    public MensagensChat salvarImagemNaMensagem(Long idMensagem,
                                                MultipartFile file, String uploadDir) throws IOException {
        MensagensChat mensagem = findById(idMensagem);
        if (mensagem == null) {
            throw new RuntimeException(
                    "Mensagem não encontrada para o ID: " + idMensagem);
        }

        Path pasta = Paths.get(uploadDir);
        if (!Files.exists(pasta)) {
            Files.createDirectories(pasta);
        }

        String nomeArquivo = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path caminho = pasta.resolve(nomeArquivo);

        Files.copy(
                file.getInputStream(), caminho, StandardCopyOption.REPLACE_EXISTING);

        mensagem.setImagem(nomeArquivo);
        return mensagensChatRepository.save(mensagem);
    }

    public List<ConversaDTO> buscarConversasDoUsuario(Long usuarioId) {
        List<MensagensChat> ultimasMensagens =
                mensagensChatRepository.findUltimasMensagensPorUsuario(usuarioId);
        List<ConversaDTO> resultado = new ArrayList<>();

        for (MensagensChat msg : ultimasMensagens) {
            Cliente outroUsuario = getOutroUsuario(msg, usuarioId);

            ConversaDTO dto = new ConversaDTO();
            dto.setConversaId(msg.getConversaId());
            dto.setIdOutroUsuario(outroUsuario.getId());
            dto.setNomeOutroUsuario(outroUsuario.getNome());
            dto.setImagemOutroUsuario(outroUsuario.getImagem());
            dto.setOutroUsuarioEhArtista(outroUsuario.isArtista());
            resultado.add(dto);
        }

        return resultado;
    }

    private Cliente getOutroUsuario(MensagensChat mensagem, Long usuarioId) {
        return mensagem.getRemetente().getId().equals(usuarioId)
                ? mensagem.getDestinatario()
                : mensagem.getRemetente();
    }

    public void deletarPorConversaId(Long conversaId) {
        List<MensagensChat> mensagens =
                mensagensChatRepository.findByConversaId(conversaId);
        mensagensChatRepository.deleteAll(mensagens);
    }
}
