package com.pixxl.service;


import com.pixxl.model.ComentarioCli;
import com.pixxl.model.Portfolio_imgs;
import com.pixxl.repository.PortfolioImgsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortfolioImgsService {
    @Autowired
    PortfolioImgsRepository portfolioImgsRepository;

    public Portfolio_imgs findById(Long id){
        Optional<Portfolio_imgs> portfolio_imgs = portfolioImgsRepository.findById(id);
        return portfolio_imgs.orElse(null);
    }

    public List<Portfolio_imgs> findAll(){
        return portfolioImgsRepository.findAll();
    }

    public Portfolio_imgs gravarPortfolioImgs(Portfolio_imgs portfolio_imgs){
        return portfolioImgsRepository.save(portfolio_imgs);
    }

    public void deletar(Long id) {portfolioImgsRepository.deleteById(id);}

    public Portfolio_imgs update(Long id, Portfolio_imgs portfolio_imgs){
        Portfolio_imgs alterado = findById(id);
        if (alterado!=null){
            alterado.setImagem(portfolio_imgs.getImagem());

            return  portfolioImgsRepository.save(alterado);
        }
        return null;
    }
}
