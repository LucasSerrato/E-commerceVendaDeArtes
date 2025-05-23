package com.pixxl.repository;

import com.pixxl.model.ImagensPainel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ImagensPainelRepository extends JpaRepository<ImagensPainel, Long> {
    List<ImagensPainel> findByComissaoId(Long comissaoId);
}
