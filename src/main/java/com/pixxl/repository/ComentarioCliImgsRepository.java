package com.pixxl.repository;

import com.pixxl.model.ComentarioCliImgs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComentarioCliImgsRepository extends JpaRepository <ComentarioCliImgs, Long> {
    List<ComentarioCliImgs> findByComentarioClienteId(Long clienteId);
    void deleteByComentarioClienteId(Long comentarioId);
}
