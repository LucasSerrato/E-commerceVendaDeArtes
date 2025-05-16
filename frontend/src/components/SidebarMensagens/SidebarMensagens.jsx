import React from 'react';
import styles from './SidebarMensagens.module.css';
import JuPerfil from '../../assets/imgs/ju_desenhos.jpg';

const SidebarMensagens = ({ conversas, onSelecionarConversa, conversaAtivaId }) => {
  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.titulo}>Mensagens</h3>
      <ul className={styles.listaConversas}>
        {conversas.map((conversa) => (
          <li
            key={conversa.id}
            className={`${styles.conversaItem} ${conversa.id === conversaAtivaId ? styles.ativa : ''}`}
            onClick={() => onSelecionarConversa(conversa.id)}
          >
            <img
              src={JuPerfil}
              alt={conversa.nome}
              className={styles.avatar}
            />
            <span className={styles.nome}>{conversa.nome}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarMensagens;
