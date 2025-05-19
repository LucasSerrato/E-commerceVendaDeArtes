import styles from "./Portfolio.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Portfolio() {
  const { usuario } = useContext(AuthContext);

  const [imagemPerfil, setImagemPerfil] = useState(null);
  const [nome, setNome] = useState(usuario?.nome || "");
  const [bio, setBio] = useState(usuario?.bio || "");
  const [link, setLink] = useState(usuario?.link || "");
  const [portfolioCards, setPortfolioCards] = useState([]);
  const [scrollIndex, setScrollIndex] = useState({});

  // useRef para refs de imagens de cada card
  const imageRefs = useRef({});

  useEffect(() => {
    const fetchPerfilEPortfolios = async () => {
      if (usuario?.role !== "artista") return;

      try {
        const clienteResponse = await fetch(
          `http://localhost:8080/api/clientes/email/${usuario.email}`,
        );
        if (!clienteResponse.ok) throw new Error("Erro ao buscar cliente");

        const clienteData = await clienteResponse.json();
        setNome(clienteData.nome);

        if (clienteData.imagem) {
          setImagemPerfil(
            `http://localhost:8080/api/clientes/imagem/${clienteData.imagem}`,
          );
        } else {
          // Define uma imagem padrão ou deixa vazio
          setImagemPerfil("/default-profile.png");
        }

        const portfolioResponse = await fetch(
          `http://localhost:8080/api/portfolio/artista/${usuario.id}`,
        );
        if (!portfolioResponse.ok) throw new Error("Erro ao buscar portfolios");

        const portfolioData = await portfolioResponse.json();

        const portfArray = Array.isArray(portfolioData)
          ? portfolioData
          : [portfolioData];

        if (portfArray.length > 0) {
          setBio(portfArray[0].bio);
          setLink(portfArray[0].link);
        }

        // PORTFOLIO CARD
        const cardsComImagens = await Promise.all(
          portfArray.map(async (p, index) => {
            const imgRes = await fetch(
              `http://localhost:8080/api/portfolioimgs/portfolio/${p.id}`,
            );
            const imgs = imgRes.ok ? await imgRes.json() : [];

            console.log("Imgs retornadas do backend:", imgs);

            const imagens = imgs.map(
              (img) =>
                `http://localhost:8080/api/portfolioimgs/imagem/${img.imagem}`,
            );

            const key = `portfolio${index}`;
            imageRefs.current[key] = [];

            return {
              ...p,
              imagens,
              key,
            };
          }),
        );

        setPortfolioCards(cardsComImagens);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchPerfilEPortfolios();
  }, [usuario]);

  // BOTAO PROXIMO
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

  // ALTURA DAS IMAGENS
  const handleImageLoad = (key) => {
    const heights =
      imageRefs.current[key]?.map((img) => img?.naturalHeight || 0) || [];
    const min = Math.min(...heights.filter(Boolean));
    if (min > 0) {
    }
  };

  // FUNCAO PARA SCROLL DAS IMAGENS
  const renderCarousel = (key, images) => (
    <div className={styles.slider_container}>
      <button
        className={styles.slider_button}
        onClick={() => handleScroll(key, "prev", images.length)}
      >
        &lt;
      </button>
      <div className={styles.portfolio_art_slide}>
        <div
          className={styles.slide_track}
          style={{
            transform: `translateX(-${(scrollIndex[key] || 0) * 100}%)`,
          }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="portfolio"
              ref={(el) => {
                if (el) imageRefs.current[key][index] = el;
              }}
              onLoad={() => handleImageLoad(key)}
            />
          ))}
        </div>
      </div>
      <button
        className={styles.slider_button}
        onClick={() => handleScroll(key, "next", images.length)}
      >
        &gt;
      </button>
    </div>
  );

  return (
    <section className={styles.portfoilio_container}>
      <div className={styles.portfolio}>
        <div className={styles.portfolio_perfil}>
          <img
            src={imagemPerfil || "/default-profile.png"}
            alt="Perfil Artista"
          />{" "}
          <span className={styles.nome_perfil}>{nome}</span>
          <div className={styles.perfil_bio}>
            <p>{bio}</p>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
              <i
                className="fas fa-external-link-alt"
                style={{ marginLeft: "8px" }}
              ></i>
            </a>
          </div>
        </div>

        {portfolioCards.map((card, idx) => (
          <div className={styles.portfolio_card} key={idx}>
            <h2 className={styles.titulo}>{card.tipo_arte}</h2>
            <div className={styles.detalhes}>
              <h3>{card.prazo} dias</h3>
              <p>
                de <span>R$ {card.preco}</span>
              </p>
            </div>
            {renderCarousel(card.key, card.imagens)}
            <Link to="/comissao" className={styles.botao_card}>
              Comissionar &#10148;
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;
