// src/main/java/com/pixxl/repository/ClienteRepository.java
package com.pixxl.repository;

import com.pixxl.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByEmail(String email);
}
