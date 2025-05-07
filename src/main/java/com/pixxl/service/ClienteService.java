package com.pixxl.service;

import com.pixxl.model.Cliente;
import com.pixxl.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List; // Import necessário para usar List

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    // Salva um novo cliente
    public Cliente salvar(Cliente cliente) {
        if (repository.existsByEmail(cliente.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado.");
        }
        return repository.save(cliente);
    }

    // Lista todos os clientes
    public List<Cliente> listarTodos() {
        return repository.findAll();
    }

    // Busca um cliente pelo email
    public Cliente buscarPorEmail(String email) {
        return repository.findByEmail(email); // Método do ClienteRepository
    }
}
