package com.pixxl.controller;

import com.pixxl.model.Comissao;
import com.pixxl.service.ComissaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/api/comissoes")
@CrossOrigin(origins = "*")
public class ComissaoController {

    @Autowired
    private ComissaoService comissaoService;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> criarComissaoComImagem(
            @RequestParam("nomeUsuario") String nomeUsuario,
            @RequestParam("descricao") String descricao,
            @RequestParam("mensagem") String mensagem,
            @RequestParam("imagem") MultipartFile imagem) {

        // Define a pasta onde os arquivos serão salvos (relativa ao diretório do projeto)
        File uploadFolder = new File("uploads/comissao").getAbsoluteFile();

        // Cria a pasta se ela não existir
        if (!uploadFolder.exists() && !uploadFolder.mkdirs()) {
            return ResponseEntity.internalServerError()
                    .body("Não foi possível criar diretório de uploads em: " + uploadFolder.getAbsolutePath());
        }

        // Verifica se a imagem foi enviada corretamente
        if (imagem == null || imagem.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Arquivo de imagem está vazio ou não foi enviado.");
        }

        try {
            // Gera um nome seguro e único para o arquivo
            String nomeArquivo = System.currentTimeMillis() + "_" +
                    imagem.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");

            // Define o caminho do arquivo a ser salvo
            File arquivoDestino = new File(uploadFolder, nomeArquivo);

            // Salva o arquivo fisicamente no disco
            imagem.transferTo(arquivoDestino);

            // Cria e preenche o objeto da comissão
            Comissao comissao = new Comissao();
            comissao.setNomeUsuario(nomeUsuario);
            comissao.setDescricao(descricao);
            comissao.setMensagem(mensagem);
            comissao.setCaminhoImagem("comissao/" + nomeArquivo); // caminho relativo para exibição

            // Salva no banco de dados
            Comissao salva = comissaoService.salvar(comissao);

            // Retorna resposta com sucesso
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
