package com.pixxl.service;

import com.pixxl.model.AceitarComissao;
import com.pixxl.repository.AceitarComissaoRepository;
import com.pixxl.repository.ComissaoRepository;
import com.pixxl.status.ComissaoStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AceitarComissaoService {
    @Autowired private AceitarComissaoRepository aceitarComissaoRepository;

    @Autowired private ComissaoRepository comissaoRepository;

    public AceitarComissao findById(Long id) {
        Optional<AceitarComissao> aceitarComissao =
                aceitarComissaoRepository.findById(id);
        return aceitarComissao.orElse(null);
    }

    public List<AceitarComissao> findAll() {
        return aceitarComissaoRepository.findAll();
    }

    public AceitarComissao gravarMensagemComissao(
            AceitarComissao aceitarComissao) {
        if (aceitarComissao.getComissao() != null
                && aceitarComissao.getComissao().getId() != null) {
            Long comissaoId = aceitarComissao.getComissao().getId();
            comissaoRepository.findById(comissaoId).ifPresent(comissao -> {
                if (comissao.getStatus() == ComissaoStatus.PENDENTE) {
                    comissao.setStatus(ComissaoStatus.AGUARDANDO_PAGAMENTO);
                    comissaoRepository.save(comissao);
                }
            });
        }
        return aceitarComissaoRepository.save(aceitarComissao);
    }

    public void deletar(Long id) {
        aceitarComissaoRepository.deleteById(id);
    }

    public AceitarComissao update(Long id, AceitarComissao aceitarComissao) {
        AceitarComissao alterado = findById(id);
        if (alterado != null) {
            alterado.setMensagem(aceitarComissao.getMensagem());
            alterado.setValor(aceitarComissao.getValor());

            return aceitarComissaoRepository.save(alterado);
        }
        return null;
    }
}
