import styles from "./styles/VerPost.module.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function VerPost() {
  const { usuario } = useContext(AuthContext);
  const [comentarios, setComentarios] = useState([]);
  const [comentarioSelecionado, setComentarioSelecionado] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Função auxiliar para formatar "há 1 min", "há 3 h", etc.
  function timeAgo(date) {
    const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
    const diffMs = Date.now() - new Date(date).getTime();

    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diffMs < minute) {
      return rtf.format(-Math.floor(diffMs / second), "second");
    } else if (diffMs < hour) {
      return rtf.format(-Math.floor(diffMs / minute), "minute");
    } else if (diffMs < day) {
      return rtf.format(-Math.floor(diffMs / hour), "hour");
    } else {
      return rtf.format(-Math.floor(diffMs / day), "day");
    }
  }

  useEffect(() => {
    if (usuario?.id) {
      fetch(`http://localhost:8080/api/comentariocliimgs/cliente/${usuario.id}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Erro ${res.status}`);
          return res.json();
        })
        .then((data) => setComentarios(data))
        .catch((err) => console.error("Falha ao carregar comentários:", err));
    }
  }, [usuario]);

  const abrirModal = (comentario) => {
    setComentarioSelecionado(comentario);
    setShowModal(true);
  };

  const fecharModal = () => {
    setComentarioSelecionado(null);
    setShowModal(false);
  };

  const deletarComentario = () => {
    if (!comentarioSelecionado) return;
    fetch(
      `http://localhost:8080/api/comentariocliimgs/${comentarioSelecionado.id}`,
      { method: "DELETE" }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao deletar");
        setComentarios((prev) =>
          prev.filter((c) => c.id !== comentarioSelecionado.id)
        );
        fecharModal();
      })
      .catch((err) => {
        console.error("Erro ao deletar:", err);
        fecharModal();
      });
  };

  return (
    <section className={styles.verPost_container}>
      <h2>Solicitações</h2>
      {comentarios.map((post) => (
        <div key={post.id} className={styles.editar_card}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <span className={styles.dataPost}>{timeAgo(post.data)}</span>

              <i
                className={`fas fa-trash ${styles.trash_btn}`}
                onClick={() => abrirModal(post)}
              />
            </div>
          </div>

          <p className={styles.nomeUsuario}>{post.descricao}</p>

          <div className={styles.image_container}>
            {post.imagem && (
              <a
                href={`http://localhost:8080/api/comentariocliimgs/imagem/${post.imagem}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`http://localhost:8080/api/comentariocliimgs/imagem/${post.imagem}`}
                  alt="Imagem"
                />
              </a>
            )}
          </div>
        </div>
      ))}

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Tem certeza que deseja deletar este comentário?</p>
            <div className={styles.modalButtons}>
              <button onClick={deletarComentario}>Sim</button>
              <button onClick={fecharModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default VerPost;
