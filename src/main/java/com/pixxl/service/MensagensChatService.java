package com.pixxl.service;

import com.pixxl.dto.ConversaDTO;
import com.pixxl.model.Cliente;
import com.pixxl.model.MensagensChat;
import com.pixxl.repository.MensagensChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MensagensChatService {

    @Autowired
    private MensagensChatRepository mensagensChatRepository;

    // 🔍 Buscar mensagem por ID
    public MensagensChat findById(Long id) {
        return mensagensChatRepository.findById(id).orElse(null);
    }

    // 🔍 Buscar todas as mensagens
    public List<MensagensChat> findAll() {
        return mensagensChatRepository.findAll();
    }

    // ✅ Buscar mensagens por conversa, ordenadas por data
    public List<MensagensChat> findByConversaId(Long conversaId) {
        return mensagensChatRepository.findByConversaIdOrderByDataEnvioAsc(conversaId);
    }

    // 💾 Salvar nova mensagem
    public MensagensChat gravarMensagensChat(MensagensChat mensagem) {
        return mensagensChatRepository.save(mensagem);
    }

    // ❌ Deletar mensagem por ID
    public void deletar(Long id) {
        mensagensChatRepository.deleteById(id);
    }

    // 📎 Upload de imagem e salvamento em mensagem existente
    public MensagensChat salvarImagemNaMensagem(Long idMensagem, MultipartFile file, String uploadDir) throws IOException {
        MensagensChat mensagem = findById(idMensagem);
        if (mensagem == null) {
            throw new RuntimeException("Mensagem não encontrada para o ID: " + idMensagem);
        }

        // Cria diretório se não existir
        Path pasta = Paths.get(uploadDir);
        if (!Files.exists(pasta)) {
            Files.createDirectories(pasta);
        }

        // Nome único para o arquivo
        String nomeArquivo = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path caminho = pasta.resolve(nomeArquivo);

        // Salvar arquivo
        Files.copy(file.getInputStream(), caminho, StandardCopyOption.REPLACE_EXISTING);

        // Salvar nome da imagem na mensagem
        mensagem.setImagem(nomeArquivo);
        return mensagensChatRepository.save(mensagem);
    }

    public List<ConversaDTO> buscarConversasDoUsuario(Long usuarioId) {
        List<MensagensChat> ultimasMensagens = mensagensChatRepository.findUltimasMensagensPorUsuario(usuarioId);
        List<ConversaDTO> resultado = new ArrayList<>();

        for (MensagensChat msg : ultimasMensagens) {
            Cliente outroUsuario = getOutroUsuario(msg, usuarioId);

            ConversaDTO dto = new ConversaDTO();
            dto.setConversaId(msg.getConversaId());
            dto.setIdOutroUsuario(outroUsuario.getId());
            dto.setNomeOutroUsuario(outroUsuario.getNome());
            dto.setImagemOutroUsuario(outroUsuario.getImagem());
            resultado.add(dto);
        }

        return resultado;
    }

    private Cliente getOutroUsuario(MensagensChat mensagem, Long usuarioId) {
        return mensagem.getRemetente().getId().equals(usuarioId)
                ? mensagem.getDestinatario()
                : mensagem.getRemetente();
    }


}
