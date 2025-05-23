package com.pixxl.repository;

import com.pixxl.model.MensagensChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MensagensChatRepository extends JpaRepository<MensagensChat, Long> {

    // 🔍 Busca todas as mensagens de uma conversa específica em ordem crescente pela data de envio
    List<MensagensChat> findByConversaIdOrderByDataEnvioAsc(Long conversaId);

    @Query("SELECT DISTINCT m.conversaId FROM MensagensChat m WHERE m.remetente.id = :usuarioId OR m.destinatario.id = :usuarioId")
    List<Long> findDistinctConversaIdsByUsuarioId(@Param("usuarioId") Long usuarioId);

    // Padrão Spring - já funciona direto
    Optional<MensagensChat> findTopByConversaIdOrderByDataEnvioDesc(Long conversaId);

    // Customizada com @Query
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

}
