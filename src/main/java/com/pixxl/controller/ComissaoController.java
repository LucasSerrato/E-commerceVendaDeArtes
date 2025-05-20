package com.pixxl.controller;

import com.pixxl.dto.ComissaoDTO;
import com.pixxl.model.Cliente;
import com.pixxl.model.Comissao;
import com.pixxl.model.Portfolio;
import com.pixxl.service.ClienteService;
import com.pixxl.service.ComissaoService;
import com.pixxl.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/comissoes")
@CrossOrigin(origins = "*")
public class ComissaoController {

    @Autowired
    private ComissaoService comissaoService;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private PortfolioService portfolioService;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> criarComissaoComImagem(
            @RequestParam("clienteId") Long clienteId,
            @RequestParam("portfolioId") Long portfolioId, // receber portfolioId em vez de artistaId
            @RequestParam("nomeUsuario") String nomeUsuario,
            @RequestParam("descricao") String descricao,
            @RequestParam("mensagem") String mensagem,
            @RequestParam("imagem") MultipartFile imagem) {

        Cliente cliente = clienteService.buscarPorId(clienteId);
        if (cliente == null) {
            return ResponseEntity.badRequest().body("Cliente não encontrado");
        }

        // Buscar o portfolio pelo id
        Portfolio portfolio = portfolioService.findById(portfolioId);
        if (portfolio == null) {
            return ResponseEntity.badRequest().body("Portfolio não encontrado");
        }

        Cliente artista = portfolio.getArtista(); // pegar artista correto do portfolio

        // Pasta para salvar imagens
        File uploadFolder = new File("uploads/comissao").getAbsoluteFile();
        if (!uploadFolder.exists() && !uploadFolder.mkdirs()) {
            return ResponseEntity.internalServerError()
                    .body("Não foi possível criar diretório de uploads em: " + uploadFolder.getAbsolutePath());
        }

        if (imagem == null || imagem.isEmpty()) {
            return ResponseEntity.badRequest().body("Arquivo de imagem está vazio ou não foi enviado.");
        }

        try {
            String nomeArquivo = System.currentTimeMillis() + "_" +
                    imagem.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
            File arquivoDestino = new File(uploadFolder, nomeArquivo);
            imagem.transferTo(arquivoDestino);

            Comissao comissao = new Comissao();
            comissao.setNomeUsuario(nomeUsuario);
            comissao.setDescricao(descricao);
            comissao.setMensagem(mensagem);
            comissao.setCliente(cliente);
            comissao.setArtista(artista);
            comissao.setCaminhoImagem("comissao/" + nomeArquivo);

            Comissao salva = comissaoService.salvar(comissao);

            return ResponseEntity.created(URI.create("/api/comissoes/" + salva.getId()))
                    .body(salva);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body("Erro ao salvar imagem: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ComissaoDTO>> listar() {
        List<Comissao> comissoes = comissaoService.listar();
        List<ComissaoDTO> dtos = comissoes.stream()
                .map(ComissaoDTO::new)
                .toList();
        return ResponseEntity.ok(dtos);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Comissao> findById(@PathVariable Long id) {
        Comissao comissao = comissaoService.findById(id);
        if (comissao != null) {
            return ResponseEntity.ok(comissao);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        comissaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/artista/{artistaId}")
    public ResponseEntity<List<ComissaoDTO>> listarPorArtista(@PathVariable Long artistaId) {
        List<Comissao> comissoes = comissaoService.listarPorArtistaId(artistaId);
        if (comissoes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<ComissaoDTO> dtos = comissoes.stream()
                .map(ComissaoDTO::new)
                .toList();
        return ResponseEntity.ok(dtos);
    }


    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<ComissaoDTO>> listarPorCliente(@PathVariable Long clienteId) {
        List<Comissao> comissoes = comissaoService.listarPorClienteId(clienteId);
        if (comissoes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<ComissaoDTO> dtos = comissoes.stream()
                .map(ComissaoDTO::new)
                .toList();
        return ResponseEntity.ok(dtos);
    }



}
