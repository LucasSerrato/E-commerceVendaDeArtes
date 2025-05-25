import styles from "./PainelArtista.module.css";
import UploadIcon from "../../assets/imgs/upload_icon.png";
import ImgRef from "../../assets/imgs/back_illus.jpg";
import React, { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function PainelArtista() {
  const { usuario } = useContext(AuthContext); // artista logado
  const [showModal, setShowModal] = useState(false);
  const [pedidos, setPedidos] = useState([]); // lista de pedidos do backend
  const pedidosPendentes = pedidos.filter((p) => p.status === "PENDENTE");
  const [pedidoAtivoIndex, setPedidoAtivoIndex] = useState(0); // controle do pedido ativo
  const [showNotificacao, setShowNotificacao] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [valor, setValor] = useState("");
  const fileInputRef = useRef(null);

  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [imagemPreview, setImagemPreview] = useState(null);
  const [imagensPainelMap, setImagensPainelMap] = useState({});

  const navigate = useNavigate();

  const enviarMensagemAceite = async ({
    idComissao,
    clienteId,
    artistaId,
    nomeArtista,
  }) => {
    try {
      await fetch("http://localhost:8080/api/mensagemchat", {
        method: "POST",
        body: JSON.stringify({
          id: idComissao,
          clienteId,
          artistaId,
          mensagem: "Olá, estou entrando em contato sobre a comissão!",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      navigate(
        `/mensagens?id=${idComissao}&nome=${encodeURIComponent(
          nomeArtista
        )}&clienteId=${clienteId}`
      );
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Erro ao iniciar conversa.");
    }
  };

  // Formata valor para BRL
  const formatarValor = (valor) => {
    const numero = Number(valor);
    if (isNaN(numero)) return "";
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Carrega os pedidos do backend quando usuario mudar (login)
  useEffect(() => {
    if (!usuario) return;

    fetch(`http://localhost:8080/api/comissoes/artista/${usuario.id}`)
      .then((res) => {
        if (res.status === 204) return []; // nenhum pedido
        if (!res.ok) throw new Error("Erro ao carregar pedidos");
        return res.json();
      })
      .then((data) => {
        setPedidos(data);
        setPedidoAtivoIndex(0); // volta para o primeiro pedido
      })
      .catch((err) => console.error(err));
  }, [usuario]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagemSelecionada(file);
    setImagemPreview(URL.createObjectURL(file)); // Para preview
  };

  const handleEnviarImagem = async () => {
    if (!imagemSelecionada) {
      alert("Por favor, selecione uma imagem antes de enviar.");
      return;
    }

    const pedido = pedidos.find((p) => p.status === "EM_ANDAMENTO");
    if (!pedido) {
      alert("Nenhum pedido em andamento encontrado.");
      return;
    }

    const formData = new FormData();
    formData.append("imagem", imagemSelecionada);

    try {
      const res = await fetch(
        `http://localhost:8080/api/imagenspainel/${pedido.id}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Falha no upload");

      // Atualiza pedidos após envio
      const resAtualizado = await fetch(
        `http://localhost:8080/api/comissoes/artista/${usuario.id}`
      );
      if (resAtualizado.ok) {
        const dataAtualizada = await resAtualizado.json();
        setPedidos(dataAtualizada);
      }

      alert("Imagem enviada com sucesso!");
      setImagemSelecionada(null);
      setImagemPreview(null);
    } catch (error) {
      alert("Erro ao enviar imagem");
      console.error(error);
    }
  };
  useEffect(() => {
    const carregarImagens = async () => {
      const map = {};

      const pedidosEmAndamento = pedidos.filter(
        (p) => p.status === "EM_ANDAMENTO"
      );

      await Promise.all(
        pedidosEmAndamento.map(async (p) => {
          try {
            const res = await fetch(
              `http://localhost:8080/api/imagenspainel/por-comissao/${p.id}`
            );
            if (res.ok) {
              const imagens = await res.json();
              map[p.id] = imagens;
            }
          } catch (e) {
            console.error(`Erro ao buscar imagens da comissão ${p.id}:`, e);
          }
        })
      );

      setImagensPainelMap(map);
    };

    if (pedidos.length > 0) {
      carregarImagens();
    }
  }, [pedidos]);

  const handleAceitar = () => {
    setShowModal(true);
  };

  const handleCancelar = async () => {
    if (!window.confirm("Tem certeza que deseja cancelar este pedido?")) return;

    const pedido = pedidos[pedidoAtivoIndex];
    if (!pedido) return;

    try {
      // Muda o status para cancelado via PUT, não DELETE
      const response = await fetch(
        `http://localhost:8080/api/comissoes/cancelar/${pedido.id}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao cancelar o pedido");
      }

      // Atualiza a lista de pedidos do artista
      const atualizaComissoes = async () => {
        try {
          const res = await fetch(
            `http://localhost:8080/api/comissoes/artista/${usuario.id}`
          );
          if (!res.ok) throw new Error("Erro ao atualizar lista");
          const data = await res.json();

          // Opcional: normaliza o status igual no cliente
          const normalizados = data.map((c) => ({
            ...c,
            status: c.status?.toUpperCase().trim(),
          }));

          setPedidos(normalizados);
        } catch (error) {
          console.error("Erro ao atualizar comissões:", error);
        }
      };

      setPedidoAtivoIndex(0);
      await atualizaComissoes();
    } catch (error) {
      console.error("Erro ao cancelar o pedido:", error);
    }
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();
    console.log("Submit modal disparado");
    aceitarComissao();
  };

  const aceitarComissao = async () => {
    if (!mensagem || !valor || Number(valor) <= 0) {
      console.log("Mensagem ou valor inválido");
      return;
    }

    const pedido = pedidos[pedidoAtivoIndex];
    if (!pedido) return;

    const corpo = {
      id: null,
      comissao: pedido,
      valor: Number(valor),
      mensagem,
      dataAceite: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/aceitarcomissao",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(corpo),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao aceitar comissão");
      }

      const resAtualizado = await fetch(
        `http://localhost:8080/api/comissoes/artista/${usuario.id}`
      );
      if (resAtualizado.ok) {
        const dataAtualizada = await resAtualizado.json();
        setPedidos(dataAtualizada); // ✅ atualiza com tudo do backend
        setPedidoAtivoIndex(0);
      }

      setShowModal(false);
      setShowNotificacao(true);
      setMensagem("");
      setValor("");
      setTimeout(() => setShowNotificacao(false), 4000);
    } catch (error) {
      console.error("Erro ao aceitar comissão:", error);
    }
  };

  // Pedido ativo atual para renderizar
  const pedidosAtivos = pedidos.filter((p) => p.status === "PENDENTE");

  useEffect(() => {
    const pendentes = pedidos.filter((p) => p.status === "PENDENTE");
    setPedidoAtivoIndex(pendentes.length > 0 ? 0 : -1);
  }, [pedidos]);

  const pedidoAtivo =
    pedidoAtivoIndex >= 0 ? pedidosAtivos[pedidoAtivoIndex] : null;
  const handleRemoverImagem = () => {
    setImagemSelecionada(null);
    setImagemPreview(null);
  };

  const marcarComoEntregue = async (comissaoId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/comissoes/${comissaoId}/status?status=CONCLUIDA`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        alert("Aguarde a confirmação da finalização do pedido do cliente!");

        // Atualiza a lista de pedidos do artista
        const resAtualizado = await fetch(
          `http://localhost:8080/api/comissoes/artista/${usuario.id}`
        );
        if (resAtualizado.ok) {
          const dataAtualizada = await resAtualizado.json();
          setPedidos(dataAtualizada);
        }
      } else {
        const error = await response.text();
        alert("Erro ao atualizar status: " + error);
      }
    } catch (error) {
      console.error("Erro ao marcar como entregue:", error);
      alert("Erro ao marcar como entregue.");
    }
  };

  return (
    <section className={styles.caixa}>
      <div className={styles.painelArtista_container}>
        {/* PAINEL PEDIDOS */}
        <div className={styles.pedidos_card}>
          <h2>Pedidos</h2>
          <h3>Pedidos que aguardam análise</h3>
          <span>Veja os detalhes e decida se deseja aceitar</span>

          {/* Notificação de quantidade */}
          {pedidosPendentes.length > 1 && (
            <div
              className={styles.alertaQuantidade}
              aria-label={`Você tem ${pedidosPendentes.length} solicitações pendentes`}
            >
              <i className="fas fa-bell" aria-hidden="true"></i>{" "}
              <strong>{pedidosPendentes.length}</strong> solicitações pendentes.
            </div>
          )}

          <div className={styles.card_caixa}>
            {pedidoAtivo ? (
              <div className={styles.comissao_card}>
                <h4 className={styles.h4}>
                  {pedidoAtivo.nomeUsuario ||
                    pedidoAtivo.clienteNome ||
                    "Cliente"}

                  {/* passo 3 - colocar onClick no ícone */}
                  <span
                    className={styles.tooltip}
                    onClick={() =>
                      enviarMensagemAceite({
                        idComissao: pedidoAtivo.id,
                        clienteId: pedidoAtivo.clienteId,
                        artistaId: usuario.id,
                        nomeArtista: usuario.nome || "Artista",
                      })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-comment"></i>
                    <span className={styles.tooltiptext}>Enviar mensagem</span>
                  </span>
                </h4>
                <h4>
                  Tipo:{" "}
                  <span>
                    {pedidoAtivo.portfolio?.tipoArte || "Não especificado"}
                  </span>
                </h4>

                <h4>
                  Mensagem:
                  <span>
                    {pedidoAtivo.mensagem || pedidoAtivo.descricaoPedido || ""}
                  </span>
                </h4>

                <h4>Imagem de referência:</h4>
                <img
                  src={
                    pedidoAtivo.imagens && pedidoAtivo.imagens.length > 0
                      ? `http://localhost:8080/uploads/${pedidoAtivo.imagens[0]}`
                      : ImgRef
                  }
                  alt="img de referencia"
                />

                <div className={styles.botoes}>
                  <div className={styles.tip}>
                    <button className={styles.aceitar} onClick={handleAceitar}>
                      &#10004;
                    </button>
                    <span className={styles.tiptext}>Aceitar</span>
                  </div>

                  <div className={styles.tip}>
                    <button className={styles.recusar} onClick={handleCancelar}>
                      &#10006;
                    </button>
                    <span className={styles.tiptext}>Recusar</span>
                  </div>
                </div>
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>

        {/* PAINEL PAGAMENTOS */}
        <div className={styles.pagamento_card}>
          <h2>Pagamentos</h2>
          <h3>Pedidos aceitos, mas ainda sem confirmação de pagamento</h3>
          <span>O pagamento precisa ser feito antes de iniciar</span>
          <div className={styles.card_caixa}>
            {pedidos
              .filter((p) => p.status === "AGUARDANDO_PAGAMENTO")
              .map((p) => (
                <div key={p.id} className={styles.comissao_card}>
                  <p
                    className={styles.pagamento_notif}
                    aria-label="Status aguardando pagamento"
                  >
                    <span
                      className={styles.dot}
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Aguardando pagamento...
                  </p>

                  <h4 className={styles.h4}>
                    {p.nomeUsuario || "Cliente"}

                    {/* passo 3 - colocar onClick no ícone */}
                    <span
                      className={styles.tooltip}
                      onClick={() =>
                        enviarMensagemAceite({
                          idComissao: pedidoAtivo.id,
                          clienteId: pedidoAtivo.clienteId,
                          artistaId: usuario.id,
                          nomeArtista: usuario.nome || "Artista",
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fas fa-comment"></i>
                      <span className={styles.tooltiptext}>
                        Enviar mensagem
                      </span>
                    </span>
                  </h4>
                  <h4>
                    Tipo:{" "}
                    <span>{p.portfolio?.tipoArte || "Não especificado"}</span>
                  </h4>
                  <h4>
                    Mensagem:<span>{p.mensagem || p.descricaoPedido}</span>
                  </h4>
                  <h4>Imagem(s) de referência:</h4>
                  <img
                    src={
                      p.imagens && p.imagens.length > 0
                        ? `http://localhost:8080/uploads/${p.imagens[0]}`
                        : ImgRef
                    }
                    alt="img de referencia"
                  />
                  <button className={styles.cancelar} onClick={handleCancelar}>
                    Cancelar solicitação
                  </button>
                </div>
              ))}

            {pedidos.filter((p) => p.status === "AGUARDANDO_PAGAMENTO")
              .length === 0 && <p></p>}
          </div>
        </div>

        {/* PAINEL EM PROCESSO */}
        <div className={styles.trabalhoFim_card}>
          <h2>Em processo</h2>
          <h3>Pedidos com entregas parciais ou em processo</h3>
          <span>Você pode atualizar o progresso aqui</span>

          <div className={styles.card_caixa}>
            {pedidos
              .filter((p) => p.status === "EM_ANDAMENTO")
              .map((p) => (
                <div key={p.id} className={styles.comissao_card}>
                  <h4 className={styles.h4}>
                    {p.nomeUsuario || "Cliente"}

                    {/* passo 3 - colocar onClick no ícone */}
                    <span
                      className={styles.tooltip}
                      onClick={() =>
                        enviarMensagemAceite({
                          idComissao: pedidoAtivo.id,
                          clienteId: pedidoAtivo.clienteId,
                          artistaId: usuario.id,
                          nomeArtista: usuario.nome || "Artista",
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fas fa-comment"></i>
                      <span className={styles.tooltiptext}>
                        Enviar mensagem
                      </span>
                    </span>
                  </h4>
                  <h4>
                    Tipo:{" "}
                    <span>{p.portfolio?.tipoArte || "Não especificado"}</span>
                  </h4>

                  {imagemPreview && (
                    <div className={styles.previewBox}>
                      <h5>Preview da imagem selecionada:</h5>
                      <img
                        src={imagemPreview}
                        alt="Preview"
                        className={styles.previewImg}
                      />
                      <div className={styles.botoes_icone}>
                        <button
                          className={styles.botao_cancelar}
                          onClick={handleRemoverImagem}
                          title="Cancelar envio"
                        >
                          <i className="fas fa-times"></i>
                        </button>

                        <button
                          className={styles.botao_enviar}
                          onClick={() => handleEnviarImagem(p.id)}
                          title="Enviar imagem"
                        >
                          <i className="fas fa-paper-plane"></i>
                        </button>
                      </div>
                    </div>
                  )}

                  <div onClick={handleClick} className={styles.uploadBox}>
                    <img src={UploadIcon} alt="icon upload" />
                    <p>Faça upload da imagem aqui</p>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  {/* Mostra imagens SOMENTE após o envio */}
                  {imagensPainelMap[p.id] &&
                    (imagensPainelMap[p.id] || []).length > 0 && (
                      <div className={styles.imagensPainel}>
                        <h5>Entregas parciais enviadas:</h5>
                        <div className={styles.galeria}>
                          {imagensPainelMap[p.id]?.map((img) => (
                            <img
                              key={img.id}
                              src={`http://localhost:8080/api/imagenspainel/arquivo/${img.imagem}`}
                              alt={img.nomeArquivo}
                              className={styles.imagemPainel}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  <button
                    className={styles.botao_arte_final}
                    onClick={() => marcarComoEntregue(p.id)}
                  >
                    <i className="fa-solid fa-check-circle"></i> Marcar como
                    Entregue
                  </button>
                </div>
              ))}

            {pedidos.filter((p) => p.status === "EM_ANDAMENTO").length ===
              0 && <p></p>}
          </div>
        </div>

        {/* PAINEL CONCLUSÃO */}
        <div className={styles.conclusao_card}>
          <h2>Aprovação</h2>
          <h3>Entregas finais aguardando a aprovação do cliente</h3>
          <span>Envie o trabalho final e aguarde feedback</span>
          <div className={styles.card_caixa}>
            {pedidos
              .filter((p) => p.status === "CONCLUIDA")
              .map((p) => (
                <div key={p.id} className={styles.comissao_card}>
                    <p className={styles.aprovacaoAviso}>Aguardando a aprovação</p>
                  <h4 className={styles.h4}>
                    {p.nomeUsuario || "Cliente"}

                    {/* passo 3 - colocar onClick no ícone */}
                    <span
                      className={styles.tooltip}
                      onClick={() =>
                        enviarMensagemAceite({
                          idComissao: pedidoAtivo.id,
                          clienteId: pedidoAtivo.clienteId,
                          artistaId: usuario.id,
                          nomeArtista: usuario.nome || "Artista",
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fas fa-comment"></i>
                      <span className={styles.tooltiptext}>
                        Enviar mensagem
                      </span>
                    </span>
                  </h4>
                  <h4>
                    Tipo:{" "}
                    <span>{p.portfolio?.tipoArte || "Não especificado"}</span>
                  </h4>
                  <h4>
                                      Mensagem:<span>{p.mensagem || p.descricaoPedido}</span>
                                    </h4>
                </div>
              ))}
            {pedidos.filter((p) => p.status === "CONCLUIDA").length === 0 && (
              <p></p>
            )}
          </div>
        </div>

        {/* PAINEL HISTÓRICO */}
        <div className={styles.concluidos_card}>
          <h2>Histórico</h2>
          <h3>Trabalhos já finalizados</h3>
          <span>Aqui ficam os pedidos finalizados ou encerrados.</span>
          <div className={styles.card_caixa}>
            {pedidos.filter(
              (p) =>
                p.status === "FINALIZADA" ||
                p.status === "CANCELADA"
            ).length === 0 ? (
              <div></div>
            ) : (
              pedidos
                .filter(
                  (p) =>
                    p.status === "FINALIZADA" ||
                    p.status === "CANCELADA"
                )
                .map((p) => (
                  <div key={p.id} className={styles.comissao_card}>
                    <h4>{p.nomeUsuario || "Cliente"}</h4>
                    <h4>
                      Tipo: <span>{p.portfolio?.tipoArte}</span>
                    </h4>
                    <p>
                        <strong>Status:</strong>{" "}
                      {p.status === "FINALIZADA" &&
                        "Pedido finalizado com sucesso."}
                      {p.status === "CANCELADA" &&
                        `Solicitação cancelada e encerrada.`}
                    </p>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className={styles.modal_overlay}>
            <div className={styles.modal}>
              <h3 className={styles.h3}>
                Aceitar Comissão{" "}
                <span onClick={() => setShowModal(false)}>&#10006;</span>
              </h3>
              <form className={styles.form_modal} onSubmit={handleSubmitModal}>
                <label className={styles.label}>
                  Valor:
                  <input
                    type="number"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Incluir uma mensagem para{" "}
                  {pedidoAtivo?.nomeUsuario || "cliente"}:
                </label>
                <textarea
                  placeholder="Mensagem"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  required
                ></textarea>
                <p>
                  Assim que o pagamento for feito, a comissão será transferido
                  para o painel em andamento.
                </p>

                <button type="submit">Enviar</button>
              </form>
            </div>
          </div>
        )}

        {/* NOTIFICAÇÃO */}
        {showNotificacao && (
          <div className={styles.notificacao}>
            Comissão aceita com sucesso! Aguarde o pagamento do cliente.
          </div>
        )}
      </div>
    </section>
  );
}

export default PainelArtista;
