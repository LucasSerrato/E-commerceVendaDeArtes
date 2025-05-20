import styles from "./VerArte.module.css";
import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

function VerArte() {
  const { id: artistaId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedPortfolioId = queryParams.get("portfolio");

  const [portfolios, setPortfolios] = useState([]);
  const [portfolioImgs, setPortfolioImgs] = useState([]);
  const [artSlideIndex, setArtSlideIndex] = useState(0);
  const [scrollIndex, setScrollIndex] = useState({});
  const [nome, setNome] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [imagemPerfil, setImagemPerfil] = useState("/default-profile.png");

  // portfolio selecionado
  const selectedPortfolio = useMemo(() => {
    return (
      portfolios.find((p) => p.id.toString() === selectedPortfolioId) || null
    );
  }, [portfolios, selectedPortfolioId]);

  useEffect(() => {
    if (portfolios.length > 0) {
      Promise.all(
        portfolios.map((p) =>
          fetch(`http://localhost:8080/api/portfolioimgs/por-portfolio/${p.id}`)
            .then((res) => res.json())
            .then((imgs) => imgs.map((img) => ({ ...img, portfolioId: p.id })))
        )
      )
        .then((results) => {
          const allImgs = results.flat();
          setPortfolioImgs(allImgs);
        })
        .catch((err) => {
          console.error("Erro ao buscar imagens de portfolios:", err);
        });
    }
  }, [portfolios]);

  useEffect(() => {
    const fetchDadosArtista = async () => {
      try {
        const resPortfolios = await fetch(
          `http://localhost:8080/api/portfolio/artista/${artistaId}`
        );
        const data = await resPortfolios.json();

        if (Array.isArray(data)) {
          setPortfolios(data);

          const primeiro = data[0];
          setBio(primeiro.bio || "");
          setLink(primeiro.link || "");

          const artistaRes = await fetch(
            `http://localhost:8080/api/clientes/${primeiro.artista.id}`
          );
          const artistaData = await artistaRes.json();

          setNome(artistaData.nome || artistaData.nomeUsuario);
          if (artistaData.imagem) {
            setImagemPerfil(
              `http://localhost:8080/api/clientes/imagem/${artistaData.imagem}`
            );
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do artista:", error);
      }
    };

    if (artistaId) {
      fetchDadosArtista();
    }
  }, [artistaId]);

  const handleScroll = (key, direction, length) => {
    setScrollIndex((prev) => {
      const current = prev[key] || 0;
      const nextIndex =
        direction === "next"
          ? current < length - 1
            ? current + 1
            : 0
          : current > 0
          ? current - 1
          : length - 1;

      return { ...prev, [key]: nextIndex };
    });
  };

  const handleArtSlide = (direction) => {
    setArtSlideIndex((prev) => {
      const max =
        portfolioImgs.filter((img) => img.portfolioId === selectedPortfolio?.id)
          .length - 1;
      return direction === "next"
        ? prev < max
          ? prev + 1
          : 0
        : prev > 0
        ? prev - 1
        : max;
    });
  };

  return (
    <section className={styles.verArte_container}>
      <section className={styles.ver_arte}>
        {selectedPortfolio && (
          <div className={styles.info_card}>
            <div className={styles.artist_perfil}>
              <img src={imagemPerfil} alt="perfil artista" />
              <span>{nome}</span>
            </div>

            <div className={styles.info}>
              <p>
                de <span>R${selectedPortfolio.preco}</span>
              </p>
              <h4>{selectedPortfolio.tipo_arte}</h4>

              <Link
                to={`/comissao/${selectedPortfolio.id}`}
                className={styles.botao_solicitar}
              >
                Solicitar serviço
              </Link>
            </div>
          </div>
        )}

        {selectedPortfolio && (
          <div className={styles.slide_container}>
            <button
              className={styles.slider_button}
              onClick={() => handleArtSlide("prev")}
            >
              &lt;
            </button>
            <div className={styles.art_slide}>
              <div
                className={styles.slide_track_ver_arte}
                style={{
                  transform: `translateX(-${artSlideIndex * 100}%)`,
                  display: "flex",
                  transition: "transform 0.5s ease",
                }}
              >
                {portfolioImgs
                  .filter((img) => img.portfolioId === selectedPortfolio.id)
                  .map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8080/api/portfolioimgs/imagem/${img.imagem}`}
                      alt={`slide ${index + 1}`}
                      style={{ minWidth: "100%" }}
                    />
                  ))}
              </div>
            </div>
            <button
              className={styles.slider_button}
              onClick={() => handleArtSlide("next")}
            >
              &gt;
            </button>
          </div>
        )}
      </section>

      <h1>Portfolio</h1>
      <section className={styles.portfolio}>
        <div className={styles.portfolio_perfil}>
          <img src={imagemPerfil} alt="Perfil Artista" />
          <span className={styles.nome_perfil}>{nome}</span>
          {bio && (
            <div className={styles.perfil_bio}>
              <p>{bio}</p>
              {link && (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                  <i
                    className="fas fa-external-link-alt"
                    style={{ marginLeft: "8px" }}
                  ></i>
                </a>
              )}
            </div>
          )}
        </div>

        {portfolios.map((p) => {
          const imgs = portfolioImgs.filter((img) => img.portfolioId === p.id);
          return (
            <div className={styles.portfolio_card} key={p.id}>
              <h2 className={styles.titulo}>{p.tipo_arte}</h2>
              <div className={styles.detalhes}>
                <h3>{p.prazo} dias</h3>
                <p>
                  de <span>R${p.preco}</span>
                </p>
              </div>

              <div className={styles.slider_container}>
                <button
                  className={styles.slider_button}
                  onClick={() => handleScroll(p.id, "prev", imgs.length)}
                >
                  &lt;
                </button>
                <div className={styles.portfolio_art_slide}>
                  <div
                    className={styles.slide_track}
                    style={{
                      transform: `translateX(-${
                        (scrollIndex[p.id] || 0) * 100
                      }%)`,
                    }}
                  >
                    {imgs.map((img, index) => (
                      <img
                        key={index}
                        src={`http://localhost:8080/api/portfolioimgs/imagem/${img.imagem}`}
                        alt={`portfolio ${p.id} img ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <button
                  className={styles.slider_button}
                  onClick={() => handleScroll(p.id, "next", imgs.length)}
                >
                  &gt;
                </button>
              </div>

              <Link to={`/comissao/${p.id}`} className={styles.botao_card}>
                Comissionar &#10148;
              </Link>
            </div>
          );
        })}
      </section>
    </section>
  );
}

export default VerArte;
