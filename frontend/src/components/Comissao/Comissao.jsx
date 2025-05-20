import styles from "./Comissao.module.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function Comissao() {
  const { usuario } = useContext(AuthContext);
  const { id } = useParams(); // id do portfolio

  const [image, setImage] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [descricao, setDescricao] = useState("");
  const [portfolio, setPortfolio] = useState(null); // Dados do portfolio
  const [imgPreview, setImgPreview] = useState(""); // Uma imagem do portfolio

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const resPortfolio = await fetch(
          `http://localhost:8080/api/portfolio/${id}`
        );
        const dataPortfolio = await resPortfolio.json();
        setPortfolio(dataPortfolio);

        const resImgs = await fetch(
          `http://localhost:8080/api/portfolioimgs/por-portfolio/${id}`
        );
        const imagens = await resImgs.json();
        if (imagens.length > 0) {
          setImgPreview(
            `http://localhost:8080/api/portfolioimgs/imagem/${imagens[0].imagem}`
          );
        }
      } catch (err) {
        console.error("Erro ao buscar dados do portfólio:", err);
      }
    };

    if (id) fetchDados();
  }, [id]);

  useEffect(() => {
    const buscarNomeUsuario = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/clientes/email/${usuario.email}`
        );
        if (!response.ok) throw new Error("Erro ao buscar nome do usuário");

        const user = await response.json();
        setNomeUsuario(user.nome);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    if (usuario && usuario.email) buscarNomeUsuario();
  }, [usuario]);

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage({ file, url: URL.createObjectURL(file) });
    } else {
      alert("Por favor, selecione um arquivo de imagem válido.");
    }
  };

  const removeImage = () => {
    if (image) {
      URL.revokeObjectURL(image.url);
    }
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descricao.trim() || !image) {
      alert("Preencha a descrição e envie uma imagem.");
      return;
    }

    const formData = new FormData();
    formData.append("nomeUsuario", nomeUsuario);
    formData.append("descricao", descricao);
    formData.append("mensagem", descricao);
    formData.append("imagem", image.file);

    try {
      const response = await fetch("http://localhost:8080/api/comissoes", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar solicitação");
      }

      const novaComissao = await response.json();

      // Salva o id da comissão no localStorage para uso no painel
      localStorage.setItem("comissaoId", novaComissao.id);

      alert("Solicitação enviada com sucesso!");
      navigate("/painel_cliente");
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao enviar solicitação.");
    }
  };

  return (
    <section className={styles.comissao_container}>
      <form className={styles.form_comissao} onSubmit={handleSubmit}>
        {portfolio && (
          <div className={styles.infoDa_solicitacao}>
            <img src={imgPreview} alt="Imagem do portfólio" />
            <h4>{portfolio.tipo_arte}</h4>
            <p>
              de <span>R${portfolio.preco}</span>
            </p>
          </div>
        )}

        <div className={styles.right_left}>
          <div className={styles.right}>
            <label htmlFor="nomeUsuario">Nome:</label>
            <input type="text" id="nomeUsuario" value={nomeUsuario} readOnly />
          </div>

          <div className={styles.left}>
            <label htmlFor="descricao">Descreva sua solicitação</label>
            <textarea
              id="descricao"
              placeholder="Mensagem"
              required
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>

        <div
          className={styles.dropzone}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length > 0) {
              handleFile(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => document.getElementById("imageInput").click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              document.getElementById("imageInput").click();
            }
          }}
          aria-label="Arraste uma imagem ou clique para selecionar"
        >
          Arraste uma imagem de referência aqui ou clique para selecionar
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files.length > 0) {
                handleFile(e.target.files[0]);
              }
            }}
          />
        </div>

        <button type="submit" className={styles.botao_solicitarSer}>
          Solicitar serviço
        </button>
      </form>

      {image && (
        <div className={styles.previewGrid}>
          <div className={styles.previewItem}>
            <img
              src={image.url}
              alt="Preview da imagem"
              className={styles.previewImage}
            />
            <button
              type="button"
              className={styles.cancelButton}
              onClick={removeImage}
              aria-label="Remover imagem"
            >
              &#10006;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Comissao;
