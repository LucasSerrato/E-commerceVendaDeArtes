package com.pixxl.repository;

import com.pixxl.model.Cliente;
import com.pixxl.model.ComentarioCli;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComentarioCliRepository extends JpaRepository<ComentarioCli, Long> {
    List<ComentarioCli> findAllByCliente(Cliente cliente);
    void deleteByCliente(Cliente cliente);
}
