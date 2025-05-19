package com.pixxl.service;

import com.pixxl.model.Portfolio;
import com.pixxl.model.Portfolio_imgs;
import com.pixxl.repository.PortfolioImgsRepository;
import com.pixxl.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PortfolioImgsService {

    @Autowired
    private PortfolioImgsRepository portfolioImgsRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    private final String uploadDir = System.getProperty("user.dir") + "/uploads/portfolio/";

    public List < Portfolio_imgs > salvarVariasImagensNoPortfolio(Long portfolioId, MultipartFile[] arquivos) throws IOException {
        Optional < Portfolio > optionalPortfolio = portfolioRepository.findById(portfolioId);
        if (!optionalPortfolio.isPresent()) {
            throw new RuntimeException("Portfolio não encontrado para o id: " + portfolioId);
        }

        Portfolio portfolio = optionalPortfolio.get();
        File pasta = new File(uploadDir);
        if (!pasta.exists()) pasta.mkdirs();

        List < Portfolio_imgs > imagensSalvas = new ArrayList < > ();

        for (MultipartFile file: arquivos) {
            if (file == null || file.isEmpty()) continue;

            String nomeLimpo = file.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-_]", "_");
            String nomeArquivo = UUID.randomUUID() + "_" + nomeLimpo;

            Path caminho = Paths.get(uploadDir, nomeArquivo);
            Files.copy(file.getInputStream(), caminho, StandardCopyOption.REPLACE_EXISTING);

            Portfolio_imgs imagem = new Portfolio_imgs();
            imagem.setImagem(nomeArquivo);
            imagem.setPortfolio(portfolio);

            imagensSalvas.add(portfolioImgsRepository.save(imagem));
        }

        return imagensSalvas;
    }

    public Portfolio_imgs findById(Long id) {
        Optional < Portfolio_imgs > portfolioImgs = portfolioImgsRepository.findById(id);
        return portfolioImgs.orElse(null);
    }

    public List < Portfolio_imgs > findAll() {
        return portfolioImgsRepository.findAll();
    }

    public List < Portfolio_imgs > findImagensByArtistaId(Long artistaId) {
        List < Portfolio > portfolios = portfolioRepository.findByArtistaId(artistaId);
        List < Portfolio_imgs > todasImagens = new ArrayList < > ();

        for (Portfolio portfolio: portfolios) {
            List < Portfolio_imgs > imagens = portfolioImgsRepository.findByPortfolioId(portfolio.getId());
            todasImagens.addAll(imagens);
        }

        return todasImagens;
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

    public List < Portfolio_imgs > findByPortfolioId(Long portfolioId) {
        return portfolioImgsRepository.findByPortfolioId(portfolioId);
    }
}