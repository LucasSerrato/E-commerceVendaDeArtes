import styles from "./styles/AdicionarNovo.module.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function AdiconarNovo() {
  const { usuario } = useContext(AuthContext);

  const [images, setImages] = useState([]);
  const [tipoArte, setTipoArte] = useState("");
  const [preco, setPreco] = useState("");
  const [prazo, setPrazo] = useState("");

  // PREVIEW IMAGEM
  const handleFiles = (files) => {
    const newImages = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );
    const previews = newImages.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...previews]);
  };

  // DELETAR IMAGEM
  const removeImage = (url) => {
    setImages((prev) => prev.filter((img) => img.url !== url));
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
      alert("Você precisa estar logado.");
      return;
    }

    if (images.length === 0) {
      alert("Por favor, selecione ao menos uma imagem.");
      return;
    }

    const portfolioData = {
      tipo_arte: tipoArte,
      preco: parseFloat(preco),
      prazo: parseInt(prazo),
      artista: {
        id: usuario.id,
      },
      bio: "",
      link: "",
    };

    try {
      const response = await fetch("http://localhost:8080/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioData),
      });

      if (!response.ok) throw new Error("Erro ao salvar");

      const result = await response.json();
      const portfolioId = result.id;

      // Enviar todas as imagens de uma só vez
      const formData = new FormData();
      images.forEach((img) => {
        formData.append("imagem", img.file);
      });

      const imgResponse = await fetch(
        `http://localhost:8080/api/portfolioimgs/${portfolioId}/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!imgResponse.ok) {
        throw new Error("Erro ao fazer upload das imagens.");
      }

      alert("Portfolio salvo com sucesso!");
      window.location.href = "/conta/editar_portfolio";

      // limpar os campos depois de salvar
      setTipoArte("");
      setPreco("");
      setPrazo("");
      setImages([]);
    } catch (error) {
      console.error("Erro ao salvar", error);
      alert("Erro ao salvar o portfolio");
    }
  };

  return (
    <section className={styles.addicionar_container}>
      <form onSubmit={handleSubmit}>
        <label>Tipo de arte</label>
        <input
          type="text"
          name="tipo_arte"
          value={tipoArte}
          onChange={(e) => setTipoArte(e.target.value)}
          placeholder="ex: Anime"
        />

        <label>Valor</label>
        <input
          type="number"
          name="preco"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="ex: R$ 70"
        />

        <label>Prazo</label>
        <input
          type="number"
          name="prazo"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
          placeholder="ex: 10 dias"
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
          Arraste uma ou mais imagens aqui ou clique para selecionar
          <label htmlFor="multiImageInput" className="sr-only">
            Selecionar imagens
          </label>
          <input
            type="file"
            id="multiImageInput"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={(e) => handleFiles(e.target.files)}
            aria-label="Selecionar imagens"
          />
        </div>

        <button type="submit" className={styles.addicionar_btn}>
          Salvar alterações
        </button>
      </form>

      <div className={styles.previewGrid}>
        {images.map((img, index) => (
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

export default AdiconarNovo;
