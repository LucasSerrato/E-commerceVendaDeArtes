import styles from "./styles/Editar.module.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Editar() {
  const { portfolioId } = useParams();

  const [portfolioData, setPortfolioData] = useState(null);
  const [images, setImages] = useState([]);
  const [tipoArte, setTipoArte] = useState("");
  const [preco, setPreco] = useState("");
  const [prazo, setPrazo] = useState("");

  const navigate = useNavigate();

  // CARREGAR DADOS EXISTENTES
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const resPortfolio = await fetch(
          `http://localhost:8080/api/portfolio/${portfolioId}`
        );
        const portfolio = await resPortfolio.json();
        setPortfolioData(portfolio);
        setTipoArte(portfolio.tipo_arte || "");
        setPreco(portfolio.preco || "");
        setPrazo(portfolio.prazo || "");

        const resImgs = await fetch(
          `http://localhost:8080/api/portfolioimgs/portfolio/${portfolioId}`
        );
        const imgs = await resImgs.json();

        const loadedImgs = imgs.map((img) => ({
          id: img.id,
          url: `http://localhost:8080/api/portfolioimgs/imagem/${img.imagem}`,
          file: null,
        }));

        setImages(loadedImgs);
      } catch (error) {
        console.error("Erro ao carregar dados do portfólio:", error);
      }
    };

    if (portfolioId) {
      fetchPortfolioData();
    }
  }, [portfolioId]);

  // SALVAR ALTERACOES
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPortfolio = {
      ...portfolioData,
      tipo_arte: tipoArte,
      preco,
      prazo,
    };

    // Atualiza os dados do portfólio
    await fetch(`http://localhost:8080/api/portfolio/${portfolioId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPortfolio),
    });

    // Salva novas imagens
    const newImages = images.filter((img) => !img.id && img.file);
    for (const img of newImages) {
      const formData = new FormData();
      formData.append("imagem", img.file);

      await fetch(
        `http://localhost:8080/api/portfolioimgs/${portfolioId}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
    }

    alert("Alterações salvas com sucesso!");
    navigate("/conta/editar_portfolio");
  };

  const handleFiles = (files) => {
    const newImages = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    const previews = newImages.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (url) => {
    setImages((prev) => prev.filter((img) => img.url !== url));
  };

  // DELETAR IMAGEM EXISTENTE
  const deleteExistingImage = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta imagem?")) {
      await fetch(`http://localhost:8080/api/portfolioimgs/${id}`, {
        method: "DELETE",
      });
      setImages((prev) => prev.filter((img) => img.id !== id));
    }
  };

  return (
    <section className={styles.editar_container}>
      <h2>Editar portfolio</h2>

      <div className={styles.form}>
        <form className={styles.edit_form}>
          <label>Tipo de arte</label>
          <input
            type="text"
            value={tipoArte}
            onChange={(e) => setTipoArte(e.target.value)}
          />

          <label>Valor</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />

          <label>Prazo</label>
          <input
            type="number"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
          />

          <div
            className={styles.dropzone}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFiles(e.dataTransfer.files);
            }}
            onClick={() => document.getElementById("multiImageInput").click()}
          >
            Arraste uma ou mais imagens de referência aqui ou clique para
            selecionar
            <input
              type="file"
              id="multiImageInput"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>

          <button
            className={styles.edit_btn}
            type="submit"
            onClick={handleSubmit}
          >
            Salvar alterações
          </button>
        </form>

        {/* Imagens já existentes */}
        <div className={styles.previousImgsGrid}>
          {images
            .filter((img) => img.id)
            .map((img, index) => (
              <div key={index} className={styles.previewItem}>
                <img
                  src={img.url}
                  alt={`Preview ${index}`}
                  className={styles.previewImage}
                />
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => deleteExistingImage(img.id)}
                >
                  &#10006;
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Novas imagens */}
      <div className={styles.previewGrid}>
        {images
          .filter((img) => !img.id)
          .map((img, index) => (
            <div key={index} className={styles.previewItem}>
              <img
                src={img.url}
                alt={`Preview ${index}`}
                className={styles.previewImage}
              />
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => removeImage(img.url)}
              >
                &#10006;
              </button>
            </div>
          ))}
      </div>
    </section>
  );
}
export default Editar;
