package com.pixxl.service;

import com.pixxl.model.Cliente;
import com.pixxl.repository.ClienteRepository;
import java.util.List; // Import necessário para usar List
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    // Usado apenas no cadastro
    public Cliente cadastrar(Cliente cliente) {
        if (repository.existsByEmail(cliente.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado.");
        }
        return repository.save(cliente);
    }

    // Usado para atualização (não verifica duplicação de email)
    public Cliente salvar(Cliente cliente) {
        return repository.save(cliente); // agora permite atualizar
    }

    public List<Cliente> listarTodos() {
        return repository.findAll();
    }

    public Cliente buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }

    public void deletar(Cliente cliente) {
        repository.delete(cliente);
    }
}
