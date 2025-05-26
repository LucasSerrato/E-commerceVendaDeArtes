import React from 'react';
import styles from './SidebarMensagens.module.css';

const cores = ['#FFB6C1', '#87CEFA', '#90EE90', '#FFD700', '#FFA07A'];

function getCorAleatoria(id: number) {
  return cores[id % cores.length];
}

function SidebarMensagens({ conversas, onSelecionarConversa, conversaAtivaId, usuarioAtual }) {
  return (
    <div className={styles.sidebar}>
      <h3 className={styles.mensagens}>Mensagens</h3>
      {conversas.map((conversa) => {
        const ehArtista = conversa.tipoOutroUsuario === 'ARTISTA';
        const temImagem = conversa.imagemOutroUsuario !== null && conversa.imagemOutroUsuario !== '';
        const imagemUrl = ehArtista
          ? `http://localhost:8080/uploads/portfolio/${conversa.imagemOutroUsuario}`
          : `http://localhost:8080/api/clientes/imagem/${conversa.imagemOutroUsuario}`;
        const corFundo = getCorAleatoria(conversa.idOutroUsuario);

        return (
          <div
            key={conversa.conversaId}
            className={`${styles.conversa} ${conversa.conversaId === conversaAtivaId ? styles.ativa : ''}`}
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
            <p>{conversa.nomeOutroUsuario}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarMensagens;
