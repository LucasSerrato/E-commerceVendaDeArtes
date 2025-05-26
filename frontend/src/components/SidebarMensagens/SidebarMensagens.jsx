import React, { useEffect, useState } from "react";
import styles from "./SidebarMensagens.module.css";

const cores = [
  "pink",
  "voilet",
  "brown",
  "blue",
  "yellow",
  "voilet",
  "purple",
  "green",
];

function getCorAleatoria(id: number) {
  return cores[id % cores.length];
}

function SidebarMensagens({
  conversas,
  onSelecionarConversa,
  conversaAtivaId,
  usuarioAtual,
}) {
  const [conversasComMensagem, setConversasComMensagem] = useState([]);

  useEffect(() => {
    const carregarUltimasMensagens = async () => {
      const novasConversas = await Promise.all(
        conversas.map(async (conversa) => {
          try {
            const response = await fetch(
              `http://localhost:8080/api/mensagemchat/conversa/${conversa.conversaId}`
            );
            const mensagens = await response.json();

            const ultimaMensagem =
              mensagens.length > 0
                ? mensagens[mensagens.length - 1].mensagem
                : "";

            return { ...conversa, ultimaMensagem };
          } catch (error) {
            console.error("Erro ao buscar mensagens:", error);
            return { ...conversa, ultimaMensagem: "" };
          }
        })
      );

      setConversasComMensagem(novasConversas);
    };

    if (conversas.length > 0) {
      carregarUltimasMensagens();
    }
  }, [conversas]);

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.mensagens}>Mensagens</h3>
      {conversasComMensagem.map((conversa) => {
        const ehArtista = conversa.tipoOutroUsuario === "ARTISTA";
        const temImagem =
          conversa.imagemOutroUsuario !== null &&
          conversa.imagemOutroUsuario !== "";
        const imagemUrl = ehArtista
          ? `http://localhost:8080/uploads/portfolio/${conversa.imagemOutroUsuario}`
          : `http://localhost:8080/api/clientes/imagem/${conversa.imagemOutroUsuario}`;
        const corFundo = getCorAleatoria(conversa.idOutroUsuario);

        return (
          <div
            key={conversa.conversaId}
            className={`${styles.conversa} ${
              conversa.conversaId === conversaAtivaId ? styles.ativa : ""
            }`}
            onClick={() => onSelecionarConversa(conversa.conversaId)}
          >
            {temImagem ? (
              <img
                src={imagemUrl}
                alt={conversa.nomeOutroUsuario}
                className={styles.avatar}
              />
            ) : (
              <div
                className={styles.avatarCliente}
                style={{ backgroundColor: corFundo }}
              >
                {conversa.nomeOutroUsuario.charAt(0).toUpperCase()}
              </div>
            )}
            <div className={styles.infoUsuario}>
              <p className={styles.nomeUsuario}>{conversa.nomeOutroUsuario}</p>
              <p className={styles.ultimaMensagem}>
                {conversa.ultimaMensagem || "Sem mensagens"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarMensagens;
