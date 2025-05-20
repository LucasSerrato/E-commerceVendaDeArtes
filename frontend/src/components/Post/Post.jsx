import styles from "./Post.module.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"; // ajuste o caminho se necessário

function Post() {
  const [descricao, setDescricao] = useState("");
  const [image, setImage] = useState(null);
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFileChange = (files) => {
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      setImage({
        file,
        url: URL.createObjectURL(file),
      });
    }
  };

  const removeImage = () => setImage(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!usuario || !usuario.id) {
        alert("Usuário não autenticado.");
        return;
      }

      // 1. Enviar texto do comentário com cliente
      const comentarioResponse = await axios.post(
        "http://localhost:8080/api/comentariocli",
        {
          descricao: descricao,
          cliente: {
            id: usuario.id, // Envia o ID do cliente logado
          },
        }
      );

      const comentarioId = comentarioResponse.data.id;

      // 2. Enviar imagem (se houver)
      if (image && image.file) {
        const formData = new FormData();
        formData.append("imagem", image.file);

        await axios.post(
          `http://localhost:8080/api/comentariocliimgs/${comentarioId}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      // Redirecionar após sucesso
      navigate("/artistas_clientes/solicitacoes");
    } catch (error) {
      console.error("Erro ao criar publicação:", error);
      alert("Erro ao criar publicação");
    }
  };

  return (
    <section className={styles.post_container}>
      <form className={styles.form_post} onSubmit={handleSubmit}>
        <div className={styles.form_left}>
          <h1>Criar publicação</h1>
          <label>Texto</label>
        </div>

        <textarea
          placeholder="Explique sua comissão"
          required
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <div
          className={styles.dropzone}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileChange(e.dataTransfer.files);
          }}
          onClick={() => document.getElementById("imageInput").click()}
        >
          Arraste uma imagem de referência aqui ou clique para selecionar
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e.target.files)}
          />
        </div>

        <button type="submit" className={styles.botao_criar}>
          Criar Publicação
        </button>

        {image && (
          <div className={styles.previewGrid}>
            <div className={styles.previewItem}>
              <img
                src={image.url}
                alt="Preview"
                className={styles.previewImage}
              />
              <button
                type="button"
                className={styles.cancelButton}
                onClick={removeImage}
              >
                &#10006;
              </button>
            </div>
          </div>
        )}
      </form>
    </section>
  );
}

export default Post;
