import React from 'react';
import styles from './SidebarMensagens.module.css';

const cores = ['#FFB6C1', '#87CEFA', '#90EE90', '#FFD700', '#FFA07A'];

function getCorAleatoria(id: number) {
  return cores[id % cores.length]; // determinístico por ID
}

function SidebarMensagens({ conversas, onSelecionarConversa, conversaAtivaId, usuarioAtual }) {
  return (
    <div className={styles.sidebar}>
      {conversas.map((conversa) => {
        const ehArtista = conversa.tipoOutroUsuario === 'ARTISTA'; // Supondo que o backend envie esse campo
        const imagemUrl = `http://localhost:8080/uploads/portfolio/${conversa.imagemOutroUsuario}`;
        const corFundo = getCorAleatoria(conversa.idOutroUsuario);

        return (
          <div
            key={conversa.conversaId}
            className={`${styles.conversa} ${conversa.conversaId === conversaAtivaId ? styles.ativa : ''}`}
            onClick={() => onSelecionarConversa(conversa.conversaId)}
          >
            {ehArtista ? (
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
            <p>{conversa.nomeOutroUsuario}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarMensagens;
