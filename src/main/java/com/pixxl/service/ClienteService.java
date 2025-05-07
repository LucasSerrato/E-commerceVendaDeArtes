// src/main/java/com/pixxl/service/ClienteService.java
package com.pixxl.service;

import com.pixxl.model.Cliente;
import com.pixxl.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    public Cliente salvar(Cliente cliente) {
        if (repository.existsByEmail(cliente.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado.");
        }
        return repository.save(cliente);
    }
}
