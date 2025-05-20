import { useEffect, useState, useRef } from "react";
import SidebarMensagens from "../SidebarMensagens/SidebarMensagens";
import styles from "./Mensagens.module.css";

const API = "http://localhost:8080";

export default function Mensagens() {
  /* ---------- states ---------- */
  const [conversas, setConversas] = useState([]);
  const [conversaAtivaId, setConversaAtivaId] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const bottomRef = useRef(null);

  const meuId = 1; // TODO: trocar pelo ID real do usuário autenticado

  /* ---------- carregar lista de conversas ---------- */
  useEffect(() => {
    const fetchConversas = async () => {
      // 🔥 troque por endpoint real quando tiver
      const mock = [
        { id: 2, nome: "ju.desenhos", avatar: "/imgs/ju_avatar.png" },
        { id: 3, nome: "pearls.art", avatar: "/imgs/pearls_avatar.png" },
        { id: 4, nome: "joao.artes", avatar: "/imgs/joao_avatar.png" }
      ];
      setConversas(mock);
      setConversaAtivaId(mock[0]?.id ?? null);
    };
    fetchConversas();
  }, []);

  /* ---------- util: identifica se texto é nome de arquivo de imagem ---------- */
  const isImagem = (texto) =>
      typeof texto === "string" &&
      (texto.endsWith(".jpg") || texto.endsWith(".jpeg") || texto.endsWith(".png"));

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
            autor: msg.remetente.id === meuId ? "cliente" : "artista"
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

  /* ---------- autoscroll para a última mensagem ---------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  /* ---------- POST: enviar texto ---------- */
  const enviarMensagem = async () => {
    if (!novaMensagem.trim()) return;
    try {
      const dto = {
        remetenteId: meuId,
        destinatarioId: conversaAtivaId,
        conversaId: conversaAtivaId,
        mensagem: novaMensagem,
        imagem: null
      };

      const res = await fetch(`${API}/api/mensagemchat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto)
      });
      if (!res.ok) throw new Error("Falha ao enviar mensagem");

      const salvo = await res.json();
      setMensagens((prev) => [...prev, { id: salvo.id, texto: salvo.mensagem, autor: "cliente" }]);
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
        imagem: null
      };
      const resMsg = await fetch(`${API}/api/mensagemchat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto)
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
        { id: msgComImagem.id, texto: msgComImagem.imagem, autor: "cliente" }
      ]);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar imagem.");
    } finally {
      // limpa input file (opcional)
      e.target.value = "";
    }
  };

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
                  {mensagens.map((msg) => (
                      <div
                          key={msg.id}
                          className={
                            msg.autor === "cliente"
                                ? styles.mensagemCliente
                                : styles.mensagemArtista
                          }
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
                  <input
                      type="text"
                      value={novaMensagem}
                      onChange={(e) => setNovaMensagem(e.target.value)}
                      placeholder="Enviar mensagem..."
                  />
                  <button onClick={enviarMensagem}>Enviar</button>
                  <input type="file" onChange={handleUploadImagem} />
                </div>
              </>
          ) : (
              <div className={styles.nenhumaConversa}>Selecione uma conversa</div>
          )}
        </div>
      </div>
  );
}
