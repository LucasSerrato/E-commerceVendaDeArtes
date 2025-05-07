package com.pixxl.repository;

import com.pixxl.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByEmail(String email);
    Cliente findByEmail(String email);
}