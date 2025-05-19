package com.pixxl.repository;

import com.pixxl.model.Portfolio_imgs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PortfolioImgsRepository extends JpaRepository < Portfolio_imgs, Long > {
    List < Portfolio_imgs > findByPortfolioId(Long portfolioId);
    @Query("SELECT pimg FROM Portfolio_imgs pimg WHERE pimg.portfolio.artista.id = :artistaId")
    List < Portfolio_imgs > findByArtistaId(Long artistaId);
}