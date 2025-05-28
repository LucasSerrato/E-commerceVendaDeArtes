package com.pixxl.service;

import com.pixxl.model.Cliente;
import com.pixxl.model.ComentarioCli;
import com.pixxl.model.Comissao;
import com.pixxl.model.Portfolio;
import com.pixxl.repository.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ClienteService {
    @Autowired private ClienteRepository repository;
    @Autowired private ComentarioCliRepository comentarioCliRepository;
    @Autowired private ComentarioCliImgsRepository comentarioCliImgsRepository; // opcional
    @Autowired private ComissaoRepository comissaoRepository;
    @Autowired private MensagensChatRepository mensagensChatRepository;
    @Autowired private PortfolioRepository portfolioRepository;
    @Autowired private PortfolioImgsRepository portfolioImgsRepository;
    @Autowired private AceitarComissaoRepository aceitarComissaoRepository;
    @Autowired private ImagensPainelRepository imagensPainelRepository;

    public Cliente salvarImagem(Long id, MultipartFile file) throws IOException {
        String uploadDir = "uploads/clientes";

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String nomeArquivo = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path caminho = uploadPath.resolve(nomeArquivo);
        Files.copy(
                file.getInputStream(), caminho, StandardCopyOption.REPLACE_EXISTING);

        Cliente cliente = repository.findById(id).orElseThrow(
                () -> new RuntimeException("Cliente não encontrado"));

        cliente.setImagem(nomeArquivo);
        return repository.save(cliente);
    }

    public Cliente cadastrar(Cliente cliente) {
        if (repository.existsByEmail(cliente.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado.");
        }
        return repository.save(cliente);
    }

    public Cliente salvar(Cliente cliente) {
        return repository.save(cliente);
    }

    public List<Cliente> listarTodos() {
        return repository.findAll();
    }

    public Cliente buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }

    public Cliente buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Cliente atualizar(Long id, Cliente clienteAtualizado) {
        Optional<Cliente> existente = repository.findById(id);
        if (existente.isPresent()) {
            Cliente cliente = existente.get();
            cliente.setNome(clienteAtualizado.getNome());
            cliente.setEmail(clienteAtualizado.getEmail());
            cliente.setSenha(clienteAtualizado.getSenha());
            cliente.setArtista(clienteAtualizado.isArtista());
            cliente.setImagem(clienteAtualizado.getImagem());
            return repository.save(cliente);
        }
        return null;
    }


    public void deletar(Cliente cliente) {
        repository.delete(cliente);
    }

    @Transactional
    public void deletarClienteComDependencias(Long clienteId) {
        Cliente cliente = repository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        mensagensChatRepository.deleteByRemetenteOrDestinatario(cliente, cliente);

        List<ComentarioCli> comentarios = comentarioCliRepository.findAllByCliente(cliente);
        for (ComentarioCli comentario : comentarios) {
            comentarioCliImgsRepository.deleteByComentarioClienteId(comentario.getId());
        }
        comentarioCliRepository.deleteAll(comentarios);

        List<Comissao> comissoes = comissaoRepository.findByClienteId(clienteId);
        comissoes.addAll(comissaoRepository.findByArtistaId(clienteId)); // caso seja artista também

        for (Comissao comissao : comissoes) {
            imagensPainelRepository.deleteAll(imagensPainelRepository.findByComissaoId(comissao.getId()));

            aceitarComissaoRepository.deleteByComissao(comissao);
        }

        comissaoRepository.deleteByClienteOrArtista(cliente, cliente);

        List<Portfolio> portfolios = portfolioRepository.findByArtista(cliente);
        for (Portfolio portfolio : portfolios) {
            portfolioImgsRepository.deleteByPortfolio(portfolio);
        }
        portfolioRepository.deleteAll(portfolios);

        repository.delete(cliente);
    }
}
