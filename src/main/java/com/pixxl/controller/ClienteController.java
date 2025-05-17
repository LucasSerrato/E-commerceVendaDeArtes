package com.pixxl.controller;

import com.pixxl.model.Cliente;
import com.pixxl.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteService service;

    // Upload de imagem de perfil
    @PostMapping("/upload/{id}")
    public ResponseEntity<Cliente> uploadImagem(
            @PathVariable Long id,
            @RequestParam("imagem") MultipartFile imagem) throws IOException {

        Cliente atualizado = service.salvarImagem(id, imagem);
        return ResponseEntity.ok(atualizado);
    }

    // Cadastro de cliente
    @PostMapping
    public ResponseEntity<Cliente> cadastrarCliente(@RequestBody Cliente cliente) {
        try {
            Cliente salvo = service.cadastrar(cliente);
            return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    // Listar todos os clientes
    @GetMapping
    public ResponseEntity<List<Cliente>> listarClientes() {
        return ResponseEntity.ok(service.listarTodos());
    }

    // Buscar cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Long id) {
        Cliente cliente = service.buscarPorId(id);
        return cliente != null ? ResponseEntity.ok(cliente) : ResponseEntity.notFound().build();
    }

    // Obter imagem de perfil do cliente
    @GetMapping("/imagem/{nomeImagem}")
    public ResponseEntity<byte[]> obterImagem(@PathVariable String nomeImagem) throws IOException {
        File imagem = new File("uploads/clientes/" + nomeImagem);

        if (!imagem.exists()) {
            return ResponseEntity.notFound().build();
        }

        byte[] conteudo = Files.readAllBytes(imagem.toPath());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // ou IMAGE_PNG, dependendo do tipo real

        return new ResponseEntity<>(conteudo, headers, HttpStatus.OK);
    }

    // Atualizar dados do cliente
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizarCliente(@PathVariable Long id, @RequestBody Cliente cliente) {
        Cliente atualizado = service.atualizar(id, cliente);
        return atualizado != null ? ResponseEntity.ok(atualizado) : ResponseEntity.notFound().build();
    }

    // Deletar cliente por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPorId(@PathVariable Long id) {
        Cliente cliente = service.buscarPorId(id);
        if (cliente != null) {
            service.deletarPorId(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Login de cliente
    @PostMapping("/login")
    public ResponseEntity<Cliente> login(@RequestBody Cliente loginRequest) {
        if (loginRequest.getEmail() == null || loginRequest.getSenha() == null) {
            return ResponseEntity.badRequest().build();
        }

        Cliente cliente = service.buscarPorEmail(loginRequest.getEmail());
        if (cliente != null && cliente.getSenha().equals(loginRequest.getSenha())) {
            return ResponseEntity.ok(cliente);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    // ⚠️ Correção: rota aceita e-mails com pontos e "@" corretamente
    @GetMapping("/email/{email:.+}")
    public ResponseEntity<Cliente> buscarPorEmail(@PathVariable String email) {
        Cliente cliente = service.buscarPorEmail(email);
        return cliente != null ? ResponseEntity.ok(cliente) : ResponseEntity.notFound().build();
    }

    @PatchMapping("/email/{email:.+}")
    public ResponseEntity<Cliente> atualizarNome(@PathVariable String email, @RequestBody Cliente atualizacao) {
        Cliente clienteExistente = service.buscarPorEmail(email);
        if (clienteExistente == null) {
            return ResponseEntity.notFound().build();
        }

        clienteExistente.setNome(atualizacao.getNome());
        Cliente atualizado = service.salvar(clienteExistente);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/email/{email:.+}")
    public ResponseEntity<Void> deletarPorEmail(@PathVariable String email) {
        Cliente cliente = service.buscarPorEmail(email);
        if (cliente == null) {
            return ResponseEntity.notFound().build();
        }

        service.deletar(cliente);
        return ResponseEntity.noContent().build();
    }
}
