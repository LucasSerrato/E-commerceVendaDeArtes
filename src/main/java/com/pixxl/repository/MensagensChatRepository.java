package com.pixxl.repository;

import com.pixxl.model.Cliente;
import com.pixxl.model.MensagensChat;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MensagensChatRepository
        extends JpaRepository<MensagensChat, Long> {
    List<MensagensChat> findByConversaIdOrderByDataEnvioAsc(Long conversaId);

    @Query("SELECT DISTINCT m.conversaId FROM MensagensChat m WHERE "
            + "m.remetente.id = :usuarioId OR m.destinatario.id = :usuarioId")
    List<Long>
    findDistinctConversaIdsByUsuarioId(@Param("usuarioId") Long usuarioId);

    Optional<MensagensChat> findTopByConversaIdOrderByDataEnvioDesc(
            Long conversaId);

    @Query("""
    SELECT m FROM MensagensChat m
    WHERE m.dataEnvio = (
        SELECT MAX(m2.dataEnvio)
        FROM MensagensChat m2
        WHERE m2.conversaId = m.conversaId
    )
    AND (m.remetente.id = :usuarioId OR m.destinatario.id = :usuarioId)
    ORDER BY m.dataEnvio DESC
""")
    List<MensagensChat> findUltimasMensagensPorUsuario(@Param("usuarioId") Long usuarioId);

    List<MensagensChat> findByConversaId(Long conversaId);

    void deleteByRemetenteOrDestinatario(Cliente remetente, Cliente destinatario);
}
