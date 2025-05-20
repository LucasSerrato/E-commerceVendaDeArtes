import styles from "./styles/VerPost.module.css";
import { useState, useEffect } from "react";

function VerPost() {
  const [comentarios, setComentarios] = useState([]);
  const [comentarioSelecionado, setComentarioSelecionado] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Buscar comentários
  useEffect(() => {
    fetch("http://localhost:8080/api/comentariocliimgs/dados")
      .then((res) => res.json())
      .then((data) => setComentarios(data))
      .catch((err) => console.error("Erro ao buscar comentários:", err));
  }, []);

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
      {
        method: "DELETE",
      }
    )
      .then(() => {
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
      {comentarios.map((post) => (
        <div key={post.id} className={styles.editar_card}>
          <div className={styles.header}>
            <p className={styles.mensagem}>{post.descricao}</p>
            <i
              className={`fas fa-trash ${styles.trash_btn}`}
              onClick={() => abrirModal(post)}
            />
          </div>

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
