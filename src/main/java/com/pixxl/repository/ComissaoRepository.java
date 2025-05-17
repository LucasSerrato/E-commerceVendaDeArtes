package com.pixxl.repository;

import com.pixxl.model.Comissao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComissaoRepository extends JpaRepository<Comissao, Long> {
}
