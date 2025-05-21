import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // ajuste o caminho se necessário
import { urlToFile } from "../../utils/fileUtils";  // ajuste o caminho conforme sua estrutura

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

  const location = useLocation();
  const bottomRef = useRef(null);

const comentarioId = parseInt(new URLSearchParams(location.search).get("id"), 10);



  const meuId = usuario?.id; // TODO: trocar pelo ID real do usuário autenticado

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
        });
      } catch (err) {
        console.error(err);
      }
    };

    buscarComentario();
  }, [comentarioId]);

const [imagensDestaque, setImagensDestaque] = useState([]);


  useEffect(() => {
    const buscarPortfoliosComImagens = async () => {
      try {
        // 1. Buscar portfólios do artista
        const res = await fetch(`${API}/api/portfolio/artista/${meuId}`);
        if (!res.ok) throw new Error("Erro ao buscar portfólios");
        const portfolios = await res.json();

        // 2. Para cada portfólio, buscar imagens
        const portfoliosComImagens = await Promise.all(
          portfolios.map(async (portfolio) => {
            const resImgs = await fetch(`${API}/api/portfolioimgs/por-portfolio/${portfolio.id}`);
            const imgs = resImgs.ok ? await resImgs.json() : [];
            return { ...portfolio, imagens: imgs };
          })
        );

        setPortfolioArtista(portfoliosComImagens);
        const imagensSelecionadas = selecionarImagensAleatorias(portfoliosComImagens);
        setImagensDestaque(imagensSelecionadas);
      } catch (err) {
        console.error(err);
      }
    };

    if (meuId) buscarPortfoliosComImagens();
  }, [meuId]);




  /* ---------- carregar lista de conversas ---------- */
  useEffect(() => {
    const fetchConversas = async () => {
      try {
        const res = await fetch(`${API}/api/mensagemchat/usuario/${meuId}`);
        if (!res.ok) throw new Error("Erro ao buscar conversas");

        const data = await res.json(); // Deve ser um array de { id, nome, avatar } ou similar
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


  /* ---------- util: identifica se texto é nome de arquivo de imagem ---------- */
  const isImagem = (texto) =>
      typeof texto === "string" &&
      (texto.endsWith(".jpg") ||
          texto.endsWith(".jpeg") ||
          texto.endsWith(".png") ||
          texto.endsWith(".webp"));

  /* ---------- GET: mensagens da conversa ---------- */
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
          }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------- troca de conversa ---------- */
  useEffect(() => {
    if (conversaAtivaId) buscarMensagens(conversaAtivaId);
  }, [conversaAtivaId]);

  /* ---------- polling a cada 3 s ---------- */
  useEffect(() => {
    const t = setInterval(() => {
      if (conversaAtivaId && document.visibilityState === "visible") {
        buscarMensagens(conversaAtivaId);
      }
    }, 3000);
    return () => clearInterval(t);
  }, [conversaAtivaId]);


const enviarMensagemAceite = async () => {
  if (!solicitacaoCliente || !portfolioArtista.length) return;

  try {
    const texto = `Olá! Aceitei sua solicitação.\n\n${solicitacaoCliente.descricao}\n\nVeja algumas artes do meu portfólio:`;

    const dto = {
      remetenteId: meuId,
      destinatarioId: conversaAtivaId,
      conversaId: conversaAtivaId,
      mensagem: texto,
      imagem: null
    };

    const res = await fetch(`${API}/api/mensagemchat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto)
    });

    if (!res.ok) throw new Error("Erro ao enviar mensagem de aceite");

    const salva = await res.json();

    setMensagens((prev) => [
      ...prev,
      { id: salva.id, texto: salva.mensagem, autor: "eu" }
    ]);

    // Também pode enviar as imagens, se quiser
    for (const img of imagensDestaque.slice(0, 2)) { // limita a 2 imagens, por exemplo
      const imagemDto = {
        remetenteId: meuId,
        destinatarioId: conversaAtivaId,
        conversaId: conversaAtivaId,
        mensagem: "",
        imagem: null
      };

      const resMsgImg = await fetch(`${API}/api/mensagemchat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imagemDto)
      });

      if (!resMsgImg.ok) throw new Error("Erro ao criar mensagem de imagem");

      const msgImagemCriada = await resMsgImg.json();

      const fd = new FormData();
      fd.append("imagem", await urlToFile(`http://localhost:8080/api/portfolioimgs/imagem/${img.imagem}`, img.imagem));

      const resUpload = await fetch(`${API}/api/mensagemchat/${msgImagemCriada.id}/imagem`, {
        method: "POST",
        body: fd
      });

      if (resUpload.ok) {
        const msgFinal = await resUpload.json();
        setMensagens((prev) => [
          ...prev,
          { id: msgFinal.id, texto: msgFinal.imagem, autor: "eu" }
        ]);
      }
    }

  } catch (err) {
    console.error(err);
    alert("Erro ao enviar mensagem de aceite.");
  }
};

  /* ---------- POST: enviar texto ---------- */
  const enviarMensagem = async () => {
    if (!novaMensagem.trim()) return;
    try {
      const dto = {
        remetenteId: meuId,
        destinatarioId: conversaAtivaId,
        conversaId: conversaAtivaId,
        mensagem: novaMensagem,
        imagem: null,
      };

      const res = await fetch(`${API}/api/mensagemchat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
      if (!res.ok) throw new Error("Falha ao enviar mensagem");

      const salvo = await res.json();
      setMensagens((prev) => [
        ...prev,
        { id: salvo.id, texto: salvo.mensagem, autor: "cliente" },
      ]);
      setNovaMensagem("");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar mensagem.");
    }
  };

  /* ---------- upload de imagem ---------- */
  const handleUploadImagem = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      /* 1. Cria mensagem vazia */
      const dto = {
        remetenteId: meuId,
        destinatarioId: conversaAtivaId,
        conversaId: conversaAtivaId,
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

      /* 2. Faz upload da imagem */
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
        { id: msgComImagem.id, texto: msgComImagem.imagem, autor: "cliente" },
      ]);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar imagem.");
    } finally {
      // limpa input file (opcional)
      e.target.value = "";
    }
  };

  /* ---------- captura tecla Enter no input ---------- */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // evita quebra de linha
      enviarMensagem();
    }
  };

  function selecionarImagensAleatorias(portfolios, quantidade = 4) {
    const todasImagens = portfolios.flatMap((p) =>
      p.imagens.map((img) => ({ ...img, tipo_arte: p.tipo_arte }))
    );

    const imagensUnicasPorTipo = {};
    todasImagens.forEach((img) => {
      if (!imagensUnicasPorTipo[img.tipo_arte]) {
        imagensUnicasPorTipo[img.tipo_arte] = [];
      }
      imagensUnicasPorTipo[img.tipo_arte].push(img);
    });

    // pegar ao menos uma imagem de até 4 tipos diferentes
    let imagensSelecionadas = Object.values(imagensUnicasPorTipo)
      .flatMap((lista) => lista.slice(0, 1)); // 1 de cada tipo

    // se tiver menos que 4, completa com aleatórias
    while (imagensSelecionadas.length < quantidade && todasImagens.length > 0) {
      const restante = todasImagens.filter(
        (img) => !imagensSelecionadas.includes(img)
      );
      if (restante.length === 0) break;
      const rand = restante[Math.floor(Math.random() * restante.length)];
      imagensSelecionadas.push(rand);
    }

    return imagensSelecionadas.slice(0, quantidade);
  }



  /* ---------- render ---------- */
  return (
      <div className={styles.containerMensagens}>
        <SidebarMensagens
            conversas={conversas}
            onSelecionarConversa={setConversaAtivaId}
            conversaAtivaId={conversaAtivaId}
        />


        <div className={styles.chatBox}>
          {conversaAtivaId ? (
              <>
                {/* corpo do chat */}
                <div className={styles.chatBody}>
                    <section className={styles.reply_container}>
                        <h5> Você aceitou essa comissão<i class='fas fa-reply'></i></h5>
                            {solicitacaoCliente && (
                              <div className={styles.solicitacaoInfo}>
                                <h4>{solicitacaoCliente.nomeUsuario}</h4>
                                <p>{solicitacaoCliente.descricao}</p>
                                <button className={styles.cancel_btn}>Cancelar solicitação</button>
                              </div>
                            )}

                            {imagensDestaque.length > 0 && (
                              <div className={styles.portfolioPreviewDestaque}>
                                <h4>Portfolio</h4>
                                <div className={styles.imagensLinha}>
                                  {imagensDestaque.map((img) => (
                                    <img
                                      key={img.id}
                                      src={`http://localhost:8080/api/portfolioimgs/imagem/${img.imagem}`}
                                      alt="Arte do portfólio"
                                      className={styles.imgPortfolio}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                        </section>
                  {mensagens.map((msg) => (
                      <div
                          key={msg.id}
                          className={msg.autor === "eu" ? styles.mensagemArtista : styles.mensagemCliente}
                      >
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
                  ))}
                  <div ref={bottomRef} />
                </div>

                {/* input + botões */}
                <div className={styles.inputBox}>
                  <label className={styles.clipIcon}>
                    <i className="fa-solid fa-paperclip"></i>
                    <input
                      type="file"
                      onChange={handleUploadImagem}
                      style={{ display: "none" }}
                    />
                  </label>

                  <input
                    type="text"
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enviar mensagem..."
                  />

                  <button onClick={enviarMensagem}>
                    <i className="fas fa-location-arrow"></i>
                  </button>
                </div>

              </>
          ) : (
              <div className={styles.nenhumaConversa}>Selecione uma conversa</div>
          )}
        </div>
      </div>
  );
}
