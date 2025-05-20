package com.pixxl.repository;

import com.pixxl.model.MensagensChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MensagensChatRepository extends JpaRepository<MensagensChat, Long> {

    // 🔍 Busca todas as mensagens de uma conversa específica em ordem crescente pela data de envio
    List<MensagensChat> findByConversaIdOrderByDataEnvioAsc(Long conversaId);
}
