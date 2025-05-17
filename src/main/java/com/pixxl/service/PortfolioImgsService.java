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
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PortfolioImgsService {

    @Autowired
    private PortfolioImgsRepository portfolioImgsRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    private final String uploadDir = "uploads/portfolio/";

    public Portfolio_imgs salvarImagemNoPortfolio(Long portfolioId, MultipartFile file) throws IOException {

        Optional<Portfolio> optionalPortfolio = portfolioRepository.findById(portfolioId);
        if (!optionalPortfolio.isPresent()) {
            throw new RuntimeException("Portfolio não encontrado para o id: " + portfolioId);
        }
        Portfolio portfolio = optionalPortfolio.get();


        File pasta = new File(uploadDir);
        if (!pasta.exists()) pasta.mkdirs();

        String nomeArquivo = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path caminho = Paths.get(uploadDir, nomeArquivo);
        Files.copy(file.getInputStream(), caminho);


        Portfolio_imgs imagem = new Portfolio_imgs();
        imagem.setImagem(nomeArquivo);
        imagem.setPortfolio(portfolio);

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

