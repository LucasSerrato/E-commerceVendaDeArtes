package com.pixxl.service;

import com.pixxl.model.Comissao;
import com.pixxl.model.ImagensPainel;
import com.pixxl.repository.ImagensPainelRepository;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImagensPainelService {
    @Autowired private ImagensPainelRepository imagensPainelRepository;

    @Autowired private ComissaoService comissaoService;

    public ImagensPainel salvarImagem(Long comissaoId, MultipartFile file,
                                      String uploadDir) throws IOException {
        Comissao comissao = comissaoService.findById(comissaoId);
        if (comissao == null) {
            throw new RuntimeException(
                    "Comissão não encontrada para o ID: " + comissaoId);
        }

        File pasta = new File(uploadDir);
        if (!pasta.exists())
            pasta.mkdirs();

        String nomeArquivo = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path caminho = Paths.get(uploadDir, nomeArquivo);
        Files.copy(file.getInputStream(), caminho);

        ImagensPainel painelImg = new ImagensPainel();
        painelImg.setComissao(comissao);
        painelImg.setImagem(nomeArquivo);

        return imagensPainelRepository.save(painelImg);
    }

    public List<ImagensPainel> findByComissaoId(Long comissaoId) {
        return imagensPainelRepository.findByComissaoId(comissaoId);
    }

    public ImagensPainel findById(Long id) {
        Optional<ImagensPainel> imagem = imagensPainelRepository.findById(id);
        return imagem.orElse(null);
    }

    public void deletar(Long id) {
        imagensPainelRepository.deleteById(id);
    }

    public ImagensPainel update(Long id, ImagensPainel novaImagem) {
        ImagensPainel existente = findById(id);
        if (existente != null) {
            existente.setImagem(novaImagem.getImagem());
            existente.setComissao(novaImagem.getComissao());
            return imagensPainelRepository.save(existente);
        }
        return null;
    }
}
