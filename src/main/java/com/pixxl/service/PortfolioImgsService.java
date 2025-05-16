package com.pixxl.service;

import com.pixxl.model.Portfolio_imgs;
import com.pixxl.repository.PortfolioImgsRepository;
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
public class PortfolioImgsService {

    @Autowired
    private PortfolioImgsRepository portfolioImgsRepository;

    public Portfolio_imgs gravarImagem(String nomeImagem) {
        Portfolio_imgs imagem = new Portfolio_imgs();
        imagem.setImagem(nomeImagem);
        return portfolioImgsRepository.save(imagem);
    }

    public String salvarImagem(MultipartFile file, String uploadDir) throws IOException {
        File pasta = new File(uploadDir);
        if (!pasta.exists()) pasta.mkdirs();

        String nomeArquivo = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path caminho = Paths.get(uploadDir, nomeArquivo);
        Files.copy(file.getInputStream(), caminho);

        return nomeArquivo;
    }

    public Portfolio_imgs findById(Long id) {
        Optional<Portfolio_imgs> portfolioImgs = portfolioImgsRepository.findById(id);
        return portfolioImgs.orElse(null);
    }

    public List<Portfolio_imgs> findAll() {
        return portfolioImgsRepository.findAll();
    }

    public Portfolio_imgs gravarPortfolioImgs(Portfolio_imgs portfolio_imgs) {
        return portfolioImgsRepository.save(portfolio_imgs);
    }

    public void deletar(Long id) {
        portfolioImgsRepository.deleteById(id);
    }

    public Portfolio_imgs update(Long id, Portfolio_imgs portfolio_imgs) {
        Portfolio_imgs alterado = findById(id);
        if (alterado != null) {
            alterado.setImagem(portfolio_imgs.getImagem());
            return portfolioImgsRepository.save(alterado);
        }
        return null;
    }
}

