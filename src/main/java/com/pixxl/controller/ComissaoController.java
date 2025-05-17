package com.pixxl.controller;

import com.pixxl.model.Comissao;
import com.pixxl.service.ComissaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/api/comissoes")
@CrossOrigin(origins = "http://localhost:3000")
public class ComissaoController {

    @Autowired
    private ComissaoService comissaoService;

    // Diretório absoluto para upload, vindo do application.properties
    @Value("${upload.dir}")
    private String uploadDir;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> criarComissaoComImagem(
            @RequestParam("nomeUsuario") String nomeUsuario,
            @RequestParam("descricao") String descricao,
            @RequestParam("mensagem") String mensagem,
            @RequestParam("imagem") MultipartFile imagem) {

        // Garante que uploadDir é um caminho absoluto
        File uploadFolder = new File(uploadDir).getAbsoluteFile();

        // Criar diretório se não existir
        if (!uploadFolder.exists() && !uploadFolder.mkdirs()) {
            return ResponseEntity.internalServerError()
                    .body("Não foi possível criar diretório de uploads em: " + uploadFolder.getAbsolutePath());
        }

        if (imagem == null || imagem.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Arquivo de imagem está vazio ou não foi enviado.");
        }

        try {
            // Nome do arquivo seguro, removendo espaços e caracteres perigosos
            String nomeArquivo = System.currentTimeMillis() + "_" +
                    imagem.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");

            File arquivoDestino = new File(uploadFolder, nomeArquivo);

            // Salvar arquivo fisicamente
            imagem.transferTo(arquivoDestino);

            // Criar objeto Comissao e definir campos
            Comissao comissao = new Comissao();
            comissao.setNomeUsuario(nomeUsuario);
            comissao.setDescricao(descricao);
            comissao.setMensagem(mensagem);
            // Salva caminho relativo, por exemplo: "1747509980249_nome.jpg"
            comissao.setCaminhoImagem(nomeArquivo);

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
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(comissaoService.listar());
    }
}
