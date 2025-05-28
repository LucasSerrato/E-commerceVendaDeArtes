package com.pixxl.repository;

import com.pixxl.model.Cliente;
import com.pixxl.model.Comissao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComissaoRepository extends JpaRepository<Comissao, Long> {
    List<Comissao> findByClienteId(Long clienteId);
    List<Comissao> findByArtistaId(Long artistaId);
    void deleteByClienteOrArtista(Cliente cliente, Cliente artista);

    List<Comissao> findByClienteOrArtista(Cliente cliente, Cliente cliente1);
}

