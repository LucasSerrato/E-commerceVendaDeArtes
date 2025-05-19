package com.pixxl.repository;

import com.pixxl.model.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PortfolioRepository extends JpaRepository < Portfolio, Long > {
    List < Portfolio > findAllByArtistaId(Long artistaId);
    List < Portfolio > findByArtistaId(Long artistaId);
}