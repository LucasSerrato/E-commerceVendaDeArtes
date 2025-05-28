package com.pixxl.repository;

import com.pixxl.model.AceitarComissao;
import com.pixxl.model.Comissao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AceitarComissaoRepository extends JpaRepository<AceitarComissao, Long> {
    void deleteByComissao(Comissao comissao);
}
