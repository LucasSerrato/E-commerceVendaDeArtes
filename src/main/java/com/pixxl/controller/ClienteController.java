package com.pixxl.controller;

import com.pixxl.model.Cliente;
import com.pixxl.service.ClienteService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*") // permite requisições do front-end
public class ClienteController {
    @Autowired private ClienteService service;

    // Cadastrar cliente
    @PostMapping
    public ResponseEntity<Cliente> cadastrarCliente(
            @RequestBody Cliente cliente) {
        try {
            Cliente salvo = service.salvar(cliente);
            return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Listar todos os clientes
    @GetMapping
    public List<Cliente> listarClientes() {
        return service.listarTodos();
    }

    // Login básico com e-mail e senha
    @PostMapping("/login")
    public ResponseEntity<Cliente> login(@RequestBody Cliente loginRequest) {
        if (loginRequest.getEmail() == null || loginRequest.getSenha() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Cliente cliente = service.buscarPorEmail(loginRequest.getEmail());

        if (cliente != null && cliente.getSenha().equals(loginRequest.getSenha())) {
            return ResponseEntity.ok(cliente);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<Cliente> buscarPorEmail(@PathVariable String email) {
        Cliente cliente = service.buscarPorEmail(email);
        if (cliente != null) {
            return ResponseEntity.ok(cliente);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("/{email}")
    public ResponseEntity<Cliente> atualizarNome(
            @PathVariable String email, @RequestBody Cliente atualizacao) {
        Cliente clienteExistente = service.buscarPorEmail(email);

        if (clienteExistente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        clienteExistente.setNome(atualizacao.getNome());
        Cliente atualizado = service.salvar(clienteExistente);

        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deletarCliente(@PathVariable String email) {
        Cliente cliente = service.buscarPorEmail(email);

        if (cliente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        service.deletar(
                cliente);
        return ResponseEntity.noContent().build(); // 204 - sucesso
    }
}
