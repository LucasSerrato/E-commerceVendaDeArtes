import styles from "./PainelCliente.module.css";
import { useEffect, useState, useContext, useCallback, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import Pix from '../../assets/imgs/icon_pix.png';
import MasterCard from '../../assets/imgs/mastercard.webp';
import UploadIcon from '../../assets/imgs/upload_icon.png';

function PainelCliente() {
  const { usuario } = useContext(AuthContext);
  const [comissoes, setComissoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comissaoSelecionada, setComissaoSelecionada] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [aceites, setAceites] = useState([]);
  const [imagensPainelMap, setImagensPainelMap] = useState({});

  const ultimaAtualizacaoRef = useRef([]);

  const fetchDados = useCallback(() => {
    if (!usuario || !usuario.id) return;
    setLoading(true);

    Promise.all([
      fetch(`http://localhost:8080/api/comissoes/cliente/${usuario.id}`).then(res => res.json()),
      fetch("http://localhost:8080/api/aceitarcomissao").then(res => res.json())
    ])
      .then(async ([comissoesData, aceitesData]) => {
        const normalizados = comissoesData.map(c => ({
          ...c,
          status: c.status?.toUpperCase().trim()
        }));

        const imagensMap = {};

        await Promise.all(normalizados.map(async (c) => {
          if (c.status === "EM_ANDAMENTO") {
            try {
              const res = await fetch(`http://localhost:8080/api/imagenspainel/por-comissao/${c.id}`);
              if (res.ok) {
                const imagens = await res.json();
                imagensMap[c.id] = imagens;
              }
            } catch (e) {
              console.error("Erro ao buscar imagensPainel:", e);
            }
          }
        }));


        // Atualiza os states
        setComissoes(normalizados);
        ultimaAtualizacaoRef.current = normalizados;
        setAceites(Array.isArray(aceitesData) ? aceitesData : aceitesData.content || []);
        setImagensPainelMap(imagensMap);
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao carregar dados");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [usuario]);

  useEffect(() => {
    fetchDados();
    const interval = setInterval(fetchDados, 10000);
    return () => clearInterval(interval);
  }, [fetchDados]);


  const getAceiteByComissaoId = (comissaoId) => {
    if (!Array.isArray(aceites)) return null;
    return aceites.find(a => a.comissao?.id === comissaoId);
  };

  const marcarComoEntregue = async (comissaoId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/comissoes/${comissaoId}/status?status=CONCLUIDA`, {
        method: 'PUT',
      });

      if (response.ok) {
        alert("Confirme a finalização do pedido no painel de conclusão!");
        fetchDados();
      } else {
        const error = await response.text();
        alert("Erro ao atualizar status: " + error);
      }
    } catch (error) {
      console.error("Erro ao marcar como entregue:", error);
      alert("Erro ao marcar como entregue.");
    }
  };

  const cancelarComissao = (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja cancelar esta comissão?");
    if (!confirmacao) return;

    fetch(`http://localhost:8080/api/comissoes/cancelar/${id}`, {
      method: "PUT",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cancelar a comissão");
        return fetch(`http://localhost:8080/api/comissoes/cliente/${usuario.id}`);
      })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar comissões");
        return res.json();
      })
      .then((data) => {
        const normalizados = data.map(c => ({
          ...c,
          status: c.status?.toUpperCase().trim()
        }));
        setComissoes(normalizados);
        setError(null);
      })
      .catch((err) => {
        setError("Erro ao cancelar: " + err.message);
      });
  };

  const handleAceitar = (comissao) => {
    setComissaoSelecionada(comissao);
    setShowModal(true);
  };

  const realizarPagamento = () => {
    if (!comissaoSelecionada) return;

    fetch(`http://localhost:8080/api/comissoes/${comissaoSelecionada.id}/status?status=EM_ANDAMENTO`, {
      method: "PUT",
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao atualizar status do pagamento");
        return res.json();
      })
      .then(() => {
        setComissoes(prev =>
          prev.map(c =>
            c.id === comissaoSelecionada.id
              ? { ...c, status: "EM_ANDAMENTO" }
              : c
          )
        );

        setShowModal(false);
        alert(`Pagamento realizado para comissão com ${comissaoSelecionada.artista.nome}`);
      })
      .catch(err => {
        alert("Erro ao processar pagamento: " + err.message);
      });
  };



  return (
    <div className={styles.caixa}>
      <div className={styles.painelCliente_container}>
        {/* PAINEL PEDIDOS */}
        <div className={styles.pedidos_card}>
          <h2>Pedido</h2>
          <h3>Pedido está aguardando resposta do artista</h3>
          <span>Assim que o artista aceitar, o pagamento será liberado</span>

          {loading && <div className={styles.card_caixa}><span>Carregando comissões...</span></div>}
          {error && <div className={styles.card_caixa} style={{ color: "red" }}><span>{error}</span></div>}

          {!loading && !error && comissoes.filter(c => c.status === "PENDENTE").length > 0 ? (
            comissoes
               .filter(c => c.status === "PENDENTE")
              .map((comissao) => (
                <div key={comissao.id} className={styles.card_caixa}>
                  <div className={styles.comissao_card}>
                    <span>Comissão para <h4>{comissao.artista.nome}</h4></span>
                    <h4>Tipo: <span>{comissao.portfolio.tipoArte}</span></h4>
                    <h4>Mensagem:<br /><span>{comissao.mensagem}</span></h4>

                    {comissao.imagens?.length > 0 && (
                      <>
                        <h4>Imagens de referência:</h4>
                        {comissao.imagens.map((img, idx) => (
                          <img
                            key={idx}
                            src={`http://localhost:8080/uploads/${img}`}
                            alt={`Imagem da comissão ${idx + 1}`}
                            className={styles.comissao_imagem}
                          />
                        ))}
                      </>
                    )}

                    <button className={styles.cancelar} onClick={() => cancelarComissao(comissao.id)}>
                      Cancelar Comissão
                    </button>
                  </div>
                </div>
              ))
          ) : (
            !loading && !error && (
              <div className={styles.card_caixa}>
                <span>Nenhum pedido pendente.</span>
              </div>
            )
          )}
        </div>

       {/* PAINEL PAGAMENTO */}
       <div className={styles.pagamentos_card}>
         <h2>Pagamento</h2>
         <h3>Pedido aceito e aguardando a realização do pagamento</h3>
         <span>O trabalho começa após a confirmação do pagamento</span>

         {comissoes.filter(c => c.status === "AGUARDANDO_PAGAMENTO").length === 0 ? (
           <div className={styles.card_caixa}>
             <span>Nenhuma comissão aguardando pagamento.</span>
           </div>
         ) : (
           comissoes
             .filter(c => c.status === "AGUARDANDO_PAGAMENTO")
             .map((comissao) => {

               return (
                 <div key={comissao.id} className={styles.card_caixa}>
                   <h4>Comissão com {comissao.artista.nome}</h4>
                   <p><strong>Tipo:</strong> {comissao.portfolio.tipoArte}</p>
                   <h4>Mensagem:</h4><span>{comissao.mensagem}</span>

                   {comissao.imagens?.length > 0 && (
                     <>
                       <h4>Imagens de referência:</h4>
                       {comissao.imagens.map((img, idx) => (
                         <img
                           key={idx}
                           src={`http://localhost:8080/uploads/${img}`}
                           alt={`Imagem da comissão ${idx + 1}`}
                           className={styles.comissao_imagem}
                         />
                       ))}
                     </>
                   )}

                   <button className={styles.aceitar} onClick={() => handleAceitar(comissao)}>
                     Realizar pagamento
                   </button>
                   <button className={styles.cancelar} onClick={() => cancelarComissao(comissao.id)}>
                     Cancelar solicitação
                   </button>
                 </div>
               );
             })
         )}
       </div>


        {/* PAINEL TRABALHO */}
        <div className={styles.trabalhofinal_card}>
          <h2>Trabalho</h2>
          <h3>Seu artista está trabalhando na comissão</h3>
          <span>Acompanhe o progresso da sua arte</span>

          {comissoes.filter(c => c.status === "EM_ANDAMENTO").length === 0 ? (
            <div className={styles.card_caixa}>
              <span>Sem comissões em andamento.</span>
            </div>
          ) : (
            comissoes
              .filter(c => c.status === "EM_ANDAMENTO")
              .map((comissao) => (
                <div key={comissao.id} className={styles.card_caixa}>
                  <h4>Comissão com {comissao.artista.nome}</h4>
                  <p><strong>Tipo:</strong> {comissao.portfolio.tipoArte}</p>
                  <p><strong>Mensagem:</strong> {comissao.mensagem}</p>

                  {comissao.imagemEntregue && (
                    <div className={styles.entrega_imagem_container}>
                      <h4>Entrega parcial ou prévia:</h4>
                      <img
                        src={`http://localhost:8080/api/imagenspainel/arquivo/${comissao.imagemEntregue}`}
                        alt="Imagem da entrega"
                        className={styles.comissao_imagem}
                      />
                    </div>
                  )}

                  {Array.isArray(imagensPainelMap[comissao.id]) && imagensPainelMap[comissao.id].length > 0 && (
                    <div>
                        <h4>Outras imagens entregues pelo artista:</h4>
                        <div className={styles.entrega_imagem_container}>

                      {imagensPainelMap[comissao.id].map((imgPainel, idx) => {
                        const imagemUrl = `http://localhost:8080/api/imagenspainel/arquivo/${imgPainel.imagem}`;
                        return (
                          <div key={idx} className={styles.galeria}>
                            <img
                              src={imagemUrl}
                              alt={`Entrega adicional ${idx + 1}`}
                              className={styles.imagemPainel}
                            />
                            <a
                              href={imagemUrl}
                              download={imgPainel.imagem}
                              className={styles.botao_baixar}
                            >
                              <i class="fa-solid fa-upload"></i>
                            </a>

                          </div>
                        );
                      })}


                    </div>
                    <button
                                                                    className={styles.botao_arte_final}
                                                                    onClick={() => marcarComoEntregue(comissao.id)}
                                                                  >
                                                                    Arte Final Entregue
                                                                  </button>
                    </div>
                  )}



                </div>
              ))
          )}
        </div>

        {/* PAINEL CONCLUSÃO */}
        <div className={styles.conclusao_card}>
          <h2>Conclusão</h2>
          <h3>Confirme a finalização do pedido se estiver satisfeito</h3>
          <span>Se estiver tudo certo, finalize a comissão</span>

          {comissoes.filter(c => c.status === "CONCLUIDA").length === 0 ? (
            <div className={styles.card_caixa}>
              <span>Sem entregas pendentes de confirmação.</span>
            </div>
          ) : (
            comissoes
              .filter(c => c.status === "CONCLUIDA")
              .map((comissao) => (
                <div key={comissao.id} className={styles.card_caixa}>
                  <h4>Comissão com {comissao.artista.nome}</h4>
                  <p><strong>Tipo:</strong> {comissao.portfolio.tipoArte}</p>
                  <p><strong>Mensagem:</strong> {comissao.mensagem}</p>
                  <button className={styles.aceitar} onClick={() => alert("Finalizar comissão")}>
                    Finalizar Pedido
                  </button>
                </div>
              ))
          )}
        </div>

        {/* PAINEL HISTÓRICO */}
        <div className={styles.historico_card}>
          <h2>Histórico</h2>
          <h3>Pedidos concluídos ou cancelados</h3>
          <span>Acesse detalhes de comissões finalizadas</span>

          {comissoes.filter(c => c.status === "CONCLUIDA" || c.status === "CANCELADA").length === 0 ? (
            <div className={styles.card_caixa}>
              <span>Sem comissões finalizadas ou canceladas ainda.</span>
            </div>
          ) : (
            comissoes
              .filter(c => c.status === "CONCLUIDA" || c.status === "CANCELADA")
              .map((comissao) => (
                <div key={comissao.id} className={styles.card_caixa}>
                  <h4>Comissão com {comissao.artista.nome}</h4>
                  <p><strong>Tipo:</strong> {comissao.portfolio.tipoArte}</p>
                  <p>Status: <strong>{comissao.status === "CONCLUIDA" ? "Concluída" : "Cancelada"}</strong></p>
                </div>
              ))
          )}
        </div>
      </div>

      {/* MODAL DE PAGAMENTO */}
      {showModal && comissaoSelecionada && (() => {
        const aceite = getAceiteByComissaoId(comissaoSelecionada.id);
        return (
          <div className={styles.modal_overlay}>
            <div className={styles.modal}>
              <span onClick={() => setShowModal(false)}>&#10006;</span>
              <h3>Pagamento da sua comissão</h3>

              <div className={styles.mensagem_valor}>
                <div className={styles.mensagem}>
                  <p>Mensagem de {comissaoSelecionada.artista.nome}</p>
                  <span>{aceite?.mensagem || "Sem mensagem"}</span>
                </div>
                <div className={styles.valor}>
                  <p>Total</p>
                  <span>R$ {aceite?.valor || "Não definido"}</span>
                </div>
              </div>

              <h4>Selecione sua forma de pagamento</h4>
              <div className={styles.pagamentos_botao}>
                <button className={styles.pix} onClick={realizarPagamento}>
                  <img src={Pix} alt="icon pix" /> Pix
                </button>
                <button className={styles.debito} onClick={realizarPagamento}>
                  <img src={MasterCard} alt="icon débito" /> Cartão de Débito
                </button>
                <button className={styles.credito} onClick={realizarPagamento}>
                  <img src={MasterCard} alt="icon crédito" /> Cartão de Crédito
                </button>

              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
export default PainelCliente;
