import styles from "./styles/EditarPortfolio.module.css";
import { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function EditarPortfolio() {
  const { usuario } = useContext(AuthContext);

  const navigate = useNavigate();

  const [showBioModal, setShowBioModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [temPortfolio, setTemPortfolio] = useState(null);
  const [portfolioParaDeletar, setPortfolioParaDeletar] = useState(null);

  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [portfolios, setPortfolios] = useState([]);

  // VERIFICAR SE TEM PORTFOLIO
  const verificarPortfolio = useCallback(async () => {
    if (!usuario) return;

    try {
      const responseImgs = await fetch(
        `http://localhost:8080/api/portfolioimgs/artista/${usuario.id}`
      );
      if (!responseImgs.ok) throw new Error("Erro ao buscar imagens");
      const dataImgs = await responseImgs.json();
      setPortfolios(dataImgs);
      setTemPortfolio(dataImgs.length > 0);

      const responseBio = await fetch(
        `http://localhost:8080/api/portfolio/artista/${usuario.id}`
      );
      if (responseBio.ok) {
        const data = await responseBio.json();
        if (data.length > 0) {
          setBio(data[0].bio || "");
          setLink(data[0].link || "");
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados do portfólio:", error);
      setTemPortfolio(false);
    }
  }, [usuario]);

  useEffect(() => {
    verificarPortfolio();
  }, [verificarPortfolio]);

  // SUBMIT BIO
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
      alert("Você precisa estar logado.");
      return;
    }

    try {
      const buscaResponse = await fetch(
        `http://localhost:8080/api/portfolio/artista/${usuario.id}`
      );
      if (!buscaResponse.ok)
        throw new Error("Erro ao buscar portfolio existente");

      const portfolios = await buscaResponse.json();
      if (!portfolios.length) {
        alert("Nenhum portfolio encontrado");
        return;
      }

      const portfolioExistente = portfolios[0];

      const atualizado = {
        ...portfolioExistente,
        bio: bio,
        link: link,
      };

      const response = await fetch(
        `http://localhost:8080/api/portfolio/${portfolioExistente.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(atualizado),
        }
      );

      if (!response.ok) throw new Error("Erro ao salvar");

      alert("Bio salvo com sucesso!");
      setShowBioModal(false);

      // Atualiza bio
      verificarPortfolio();
    } catch (error) {
      console.error("Erro ao salvar", error);
      alert("Erro ao salvar o bio");
    }
  };

  // DELETE PORTFOLIO
  const confirmDelete = async () => {
    if (!portfolioParaDeletar) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/portfolio/${portfolioParaDeletar}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Erro ao deletar");

      alert("Portfólio deletado com sucesso!");

      // Atualiza dados após remoção
      verificarPortfolio();
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao deletar o portfólio.");
    } finally {
      setShowDeleteModal(false);
      setPortfolioParaDeletar(null);
    }
  };

  return (
    <section className={styles.edit_container}>
      {/* BOTAO ADICIONAR ARTE E BIOGRAFIA */}
      <div className={styles.item} onClick={() => navigate("/conta/add_novo")}>
        <span>Adicionar novo arte</span>
        <i className="fas fa-angle-right" />
      </div>

      {/* BOTÃO BIOGRAFIA APARECE APENAS SE TIVER PORTFÓLIO */}
      {temPortfolio && (
        <div className={styles.item} onClick={() => setShowBioModal(true)}>
          <span>Biografia</span>
          <i className="fas fa-pen" />
        </div>
      )}

      {/* LISTA DE PORTFÓLIOS */}
      <section className={styles.editar_card_container}>
        {[
          ...new Map(portfolios.map((img) => [img.portfolio.id, img])).values(),
        ].map((img, index) => (
          <div key={img.portfolio.id} className={styles.editar_card}>
            <img
              src={`http://localhost:8080/api/portfolioimgs/imagem/${img.imagem}`}
              alt="Arte"
            />

            <div className={styles.card_info}>
              <h4>{img.portfolio.tipo_arte}</h4>
              <p>
                de <span>R${img.portfolio.preco}</span>
              </p>
            </div>

            <div className={styles.card_btn}>
              <i
                className={`fas fa-pen ${styles.edit_btn}`}
                onClick={() => navigate(`/conta/editar/${img.portfolio.id}`)}
              />
              <i
                className={`fas fa-trash ${styles.trash_btn}`}
                onClick={() => {
                  setPortfolioParaDeletar(img.portfolio.id);
                  setShowDeleteModal(true);
                }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* MODAL BIOGRAFIA */}
      {showBioModal && (
        <div
          className={styles.overlay_modal}
          onClick={() => setShowBioModal(false)}
        >
          <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            <h2>Editar Biografia</h2>
            <form onSubmit={handleSubmit}>
              <label>Portfólio público</label>
              <input
                className={styles.input}
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://artistree.io/pearls.art"
              />

              <label>Bio</label>
              <textarea
                className={styles.textarea}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Digite sua biografia..."
              />

              <button className={styles.bio_btn}>Salvar</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DELETE */}
      {showDeleteModal && (
        <div className={styles.overlay_modal}>
          <div className={styles.delete_modal}>
            <h3>Tem certeza que deseja apagar a arte?</h3>
            <div className={styles.botao_modal}>
              <button
                className={styles.cancelar_btn}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button
                className={styles.confirm_delete_btn}
                onClick={confirmDelete}
              >
                Apagar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default EditarPortfolio;
