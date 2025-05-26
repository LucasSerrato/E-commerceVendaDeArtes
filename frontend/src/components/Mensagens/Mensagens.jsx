import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { urlToFile } from "../../utils/fileUtils";

import SidebarMensagens from "../SidebarMensagens/SidebarMensagens";
import styles from "./Mensagens.module.css";

const API = "http://localhost:8080";

export default function Mensagens() {
  const { usuario } = useContext(AuthContext);

  /* ---------- states ---------- */
  const [conversas, setConversas] = useState([]);
  const [conversaAtivaId, setConversaAtivaId] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [solicitacaoCliente, setSolicitacaoCliente] = useState(null);
  const [portfolioArtista, setPortfolioArtista] = useState([]);
  const [imagensDestaque, setImagensDestaque] = useState([]);
  const [enviando, setEnviando] = useState(false);

  const artista = usuario?.artista;

  const location = useLocation();
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const getCorAleatoria = (id: number) => {
    const cores = [
      "#FFB6C1",
      "#87CEFA",
      "#90EE90",
      "#FFD700",
      "#FFA07A",
      "pink",
      "violet",
      "brown",
      "blue",
      "yellow",
      "purple",
    ];
    return cores[id % cores.length];
  };

  const comentarioId = parseInt(
    new URLSearchParams(location.search).get("id"),
    10
  );
  const meuId = usuario?.id;

  const mapMensagemParaAutor = (msg) => {
    const isRemetente = msg.remetente.id === meuId;
    if (artista) {
      return isRemetente ? "eu" : "outro";
    } else {
      return isRemetente ? "outro" : "eu";
    }
  };

  const handleSelecionarConversa = (id) => {
    setConversaAtivaId(id);
    navigate(`/mensagens?id=${id}`);
  };

  const handleCancelarSolicitacao = async () => {
    if (!conversaAtivaId) return;

    const confirmar = window.confirm(
      "Tem certeza que deseja cancelar a solicitação e apagar a conversa?"
    );
    if (!confirmar) return;

    try {
      const res = await fetch(
        `${API}/api/mensagemchat/conversa/${conversaAtivaId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Erro ao deletar a conversa");

      setMensagens([]);
      setConversaAtivaId(null);
      setSolicitacaoCliente(null);

      // Atualiza a lista de conversas
      const novasConversas = conversas.filter((c) => c.id !== conversaAtivaId);
      setConversas(novasConversas);

      navigate("/mensagens");
    } catch (err) {
      console.error(err);
      alert("Erro ao cancelar a solicitação.");
    }
  };

  /* ---------- effects ---------- */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = parseInt(params.get("id"), 10);
    if (id && conversaAtivaId !== id) {
      setConversaAtivaId(id);
    }
  }, [location.search, conversaAtivaId]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = parseInt(params.get("id"), 10);
    if (id && !conversaAtivaId) {
      setConversaAtivaId(id);
    }
  }, [location.search]);

  useEffect(() => {
    const buscarComentario = async () => {
      if (!comentarioId) return;
      try {
        const res = await fetch(`${API}/api/comentariocli/${comentarioId}`);
        if (!res.ok) throw new Error("Erro ao buscar comentário");

        const data = await res.json();
        setSolicitacaoCliente({
          nomeUsuario: data.cliente.nome,
          descricao: data.descricao,
          clienteId: data.cliente.id,
        });
      } catch (err) {
        console.error(err);
      }
    };

    buscarComentario();
  }, [comentarioId]);

  useEffect(() => {
    const fetchConversas = async () => {
      try {
        const res = await fetch(`${API}/api/mensagemchat/usuario/${meuId}`);
        if (!res.ok) throw new Error("Erro ao buscar conversas");

        const data = await res.json();
        setConversas(data);
        if (!conversaAtivaId && data.length > 0) {
          setConversaAtivaId(data[0].id);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (meuId) fetchConversas();
  }, [meuId]);

  /* ---------- functions ---------- */
  const isImagem = (texto) =>
    typeof texto === "string" &&
    (texto.endsWith(".jpg") ||
      texto.endsWith(".jpeg") ||
      texto.endsWith(".png") ||
      texto.endsWith(".webp"));

  const buscarMensagens = async (idConversa) => {
    try {
      const res = await fetch(`${API}/api/mensagemchat/conversa/${idConversa}`);
      if (!res.ok) throw new Error("Falha ao buscar mensagens");
      const data = await res.json();

      setMensagens(
        data.map((msg) => ({
          id: msg.id,
          texto: msg.imagem ?? msg.mensagem,
          autor: msg.remetente.id === meuId ? "eu" : "outro",
          remetenteNome: msg.remetente.nome,
          dataEnvio: msg.dataEnvio,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const enviarMensagem = async () => {
    if (!novaMensagem.trim() || enviando) return;

    if (!meuId || !solicitacaoCliente?.clienteId) {
      alert("Dados incompletos para enviar mensagem");
      return;
    }

    setEnviando(true);
    try {
      // Verifica se temos uma conversa, se não, cria uma nova
      let conversaId = conversaAtivaId;
      if (!conversaAtivaId) {
        const resConversa = await fetch(`${API}/api/conversas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario1Id: meuId,
            usuario2Id: solicitacaoCliente.clienteId,
          }),
        });

        if (!resConversa.ok) throw new Error("Falha ao criar conversa");
        const novaConversa = await resConversa.json();
        conversaId = novaConversa.id;
        setConversaAtivaId(novaConversa.id);
      }

      const dto = {
        remetenteId: meuId,
        destinatarioId: solicitacaoCliente.clienteId,
        conversaId: conversaId,
        mensagem: novaMensagem,
        imagem: null,
      };

      const res = await fetch(`${API}/api/mensagemchat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Falha ao enviar mensagem");
      }

      const salvo = await res.json();
      setMensagens((prev) => [
        ...prev,
        {
          id: salvo.id,
          texto: salvo.mensagem,
          autor: mapMensagemParaAutor({ remetente: { id: meuId } }),
        },
      ]);

      setNovaMensagem("");
      await buscarMensagens(conversaId);

      await buscarMensagens(conversaId);
    } catch (err) {
      console.error("Erro detalhado:", err);
      alert(`Erro ao enviar mensagem: ${err.message}`);
    } finally {
      setEnviando(false);
    }
  };

  const handleUploadImagem = async (e) => {
    const file = e.target.files[0];
    if (!file || enviando) return;

    if (!meuId || !solicitacaoCliente?.clienteId) {
      alert("Dados incompletos para enviar imagem");
      return;
    }

    setEnviando(true);
    try {
      let conversaId = conversaAtivaId;
      if (!conversaAtivaId) {
        const resConversa = await fetch(`${API}/api/conversas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario1Id: meuId,
            usuario2Id: solicitacaoCliente.clienteId,
          }),
        });

        if (!resConversa.ok) throw new Error("Falha ao criar conversa");
        const novaConversa = await resConversa.json();
        conversaId = novaConversa.id;
        setConversaAtivaId(novaConversa.id);
      }

      const dto = {
        remetenteId: meuId,
        destinatarioId: solicitacaoCliente.clienteId,
        conversaId: conversaId,
        mensagem: "",
        imagem: null,
      };

      const resMsg = await fetch(`${API}/api/mensagemchat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
      if (!resMsg.ok) throw new Error("Falha ao criar mensagem");

      const msgCriada = await resMsg.json();

      const fd = new FormData();
      fd.append("imagem", file);

      const resImg = await fetch(
        `${API}/api/mensagemchat/${msgCriada.id}/imagem`,
        { method: "POST", body: fd }
      );
      if (!resImg.ok) throw new Error("Falha ao enviar imagem");

      const msgComImagem = await resImg.json();

      setMensagens((prev) => [
        ...prev,
        {
          id: msgComImagem.id,
          texto: msgComImagem.imagem,
          autor: mapMensagemParaAutor({ remetente: { id: meuId } }),
        },
      ]);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar imagem.");
    } finally {
      e.target.value = "";
      setEnviando(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  };

  /* ---------- polling a cada 3s ---------- */
  useEffect(() => {
    if (conversaAtivaId) {
      buscarMensagens(conversaAtivaId);

      const t = setInterval(() => {
        if (conversaAtivaId && document.visibilityState === "visible") {
          buscarMensagens(conversaAtivaId);
        }
      }, 1000);

      return () => clearInterval(t);
    }
  }, [conversaAtivaId]);

  /* ---------- render ---------- */
  return (
    <div className={styles.containerMensagens}>
      <SidebarMensagens
        conversas={conversas}
        onSelecionarConversa={handleSelecionarConversa}
        conversaAtivaId={conversaAtivaId}
      />

      <div className={styles.chatBox}>
        {conversaAtivaId ? (
          <>
            {conversas.length > 0 &&
              conversaAtivaId &&
              (() => {
                const conversaAtual = conversas.find(
                  (c) => c.conversaId === conversaAtivaId
                );
                if (!conversaAtual) return null;

                const ehArtista = conversaAtual.tipoOutroUsuario === "ARTISTA";
                const temImagem = conversaAtual.imagemOutroUsuario;
                const imagemUrl = ehArtista
                  ? `http://localhost:8080/uploads/portfolio/${conversaAtual.imagemOutroUsuario}`
                  : `http://localhost:8080/api/clientes/imagem/${conversaAtual.imagemOutroUsuario}`;
                const corFundo = getCorAleatoria(conversaAtual.idOutroUsuario);

                return (
                  <div className={styles.navTopo}>
                    {temImagem ? (
                      <img
                        src={imagemUrl}
                        alt={conversaAtual.nomeOutroUsuario}
                        className={styles.avatarNav}
                      />
                    ) : (
                      <div
                        className={styles.avatarClienteNav}
                        style={{ backgroundColor: corFundo }}
                      >
                        {conversaAtual.nomeOutroUsuario.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className={styles.nomeNav}>
                      {conversaAtual.nomeOutroUsuario}
                    </span>
                  </div>
                );
              })()}

            <div className={styles.chatBody}>
              <section className={styles.reply_container}>
                {solicitacaoCliente && (
                  <div className={styles.solicitacaoInfo}>
                    <h4>{solicitacaoCliente.nomeUsuario}</h4>
                    <p>{solicitacaoCliente.descricao}</p>
                    <button
                      className={styles.cancel_btn}
                      onClick={handleCancelarSolicitacao}
                    >
                      Cancelar solicitação
                    </button>
                  </div>
                )}
              </section>

              {mensagens.map((msg) => {
                const ehRemetente =
                  (artista && msg.autor === "eu") ||
                  (!artista && msg.autor !== "eu");

                return (
                  <div
                    key={msg.id}
                    className={
                      ehRemetente
                        ? styles.mensagemArtista
                        : styles.mensagemCliente
                    }
                  >
                    <div className={styles.mensagemHeader}>
                      <strong className={styles.remetenteNome}>
                        {msg.remetenteNome}
                      </strong>
                      <span className={styles.timestamp}>
                        {new Date(msg.dataEnvio).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {isImagem(msg.texto) ? (
                      <img
                        src={`${API}/uploads/mensagens/${msg.texto}`}
                        alt="Imagem enviada"
                        style={{ maxWidth: "200px", borderRadius: "10px" }}
                      />
                    ) : (
                      <p>{msg.texto}</p>
                    )}
                  </div>
                );
              })}

              <div ref={bottomRef} />
            </div>

            <div className={styles.inputBox}>
              <input
                type="text"
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enviar mensagem..."
                disabled={enviando}
              />
              <div className={styles.icons}>
                <label className={styles.clipIcon}>
                  <i class="fa-solid fa-camera"></i>
                  <input
                    type="file"
                    onChange={handleUploadImagem}
                    style={{ display: "none" }}
                    disabled={enviando}
                  />
                </label>

                <button onClick={enviarMensagem} disabled={enviando}>
                  {enviando ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <p>&#10148;</p>
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.nenhumaConversa}>Selecione uma conversa</div>
        )}
      </div>
    </div>
  );
}
