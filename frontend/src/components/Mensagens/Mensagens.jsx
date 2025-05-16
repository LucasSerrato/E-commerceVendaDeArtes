import { useEffect, useState } from "react";
import SidebarMensagens from "../SidebarMensagens/SidebarMensagens";
import styles from './Mensagens.module.css';

function Mensagens() {
  const [conversas, setConversas] = useState([]);
  const [conversaAtivaId, setConversaAtivaId] = useState(null);
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    // Simulação de API: obter a lista de conversas
    const fetchConversas = async () => {
      // substituir pela chamada real
      const resultadoFake = [
        { id: 1, nome: "ju.desenhos", avatar: "/imgs/ju_avatar.png" },
        { id: 2, nome: "pearls.art", avatar: "/imgs/pearls_avatar.png" },
        { id: 3, nome: "joao.artes", avatar: "/imgs/joao_avatar.png" }
      ];
      setConversas(resultadoFake);
      setConversaAtivaId(resultadoFake[0]?.id); // já seleciona a primeira conversa
    };

    fetchConversas();
  }, []);

  useEffect(() => {
    // Simular fetch de mensagens da conversa ativa
    if (conversaAtivaId) {
      const fetchMensagens = async () => {
        // Substituir por API real
        const mensagensFake = [
          { id: 1, texto: "Olá, tudo bem?", autor: "cliente" },
          { id: 2, texto: "Oi! Pronto para sua comissão!", autor: "artista" }
        ];
        setMensagens(mensagensFake);
      };
      fetchMensagens();
    }
  }, [conversaAtivaId]);

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
            <div className={styles.chatBody}>
              {mensagens.map((msg) => (
                <div
                  key={msg.id}
                  className={msg.autor === "cliente" ? styles.mensagemCliente : styles.mensagemArtista}
                >
                  {msg.texto}
                </div>
              ))}
            </div>
            <div className={styles.inputBox}>
              <input type="text" placeholder="Enviar mensagem..." />
              <button>Enviar</button>
            </div>
          </>
        ) : (
          <div className={styles.nenhumaConversa}>Selecione uma conversa</div>
        )}
      </div>
    </div>
  );
}

export default Mensagens;
