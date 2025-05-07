// src/main/java/com/pixxl/controller/ClienteController.java
package com.pixxl.controller;

import com.pixxl.model.Cliente;
import com.pixxl.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteService service;

    // Cadastro de cliente
    @PostMapping
    public Cliente cadastrarCliente(@RequestBody Cliente cliente) {
        return service.salvar(cliente);
    }

    // Listar todos os clientes
    @GetMapping
    public List<Cliente> listarClientes() {
        return service.listarTodos();
    }

    // Login simples por email e senha
    @PostMapping("/login")
    public ResponseEntity<Cliente> login(@RequestBody Cliente loginRequest) {
        // Verifica se o email e a senha foram enviados na requisição
        if (loginRequest.getEmail() == null || loginRequest.getSenha() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Requisição malformada
        }

        // Busca o cliente pelo email
        Cliente cliente = service.buscarPorEmail(loginRequest.getEmail());

        // Verifica se o cliente foi encontrado e se a senha está correta
        if (cliente != null && cliente.getSenha().equals(loginRequest.getSenha())) {
            return ResponseEntity.ok(cliente); // Login bem-sucedido
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Email ou senha inválidos
        }
    }
}
