import styles from "./Portfolio.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import JuPerfil from "../../assets/imgs/ju_desenhos.jpg";
import Illustracao from "../../assets/imgs/illustration_dragon.jpg";
import Illus2 from "../../assets/imgs/illus2.jpg";
import Illus3 from "../../assets/imgs/illus3.jpg";
import Illus4 from "../../assets/imgs/illus4.jpg";
import Illus5 from "../../assets/imgs/illus5.jpg";
import MeioCorpo from "../../assets/imgs/half_body.jpg";
import MeioCorpo1 from "../../assets/imgs/half_body_side.jpg";
import MeioCorpo2 from "../../assets/imgs/half_body_witch.jpg";
import Retrato from "../../assets/imgs/portrait_man.jpg";
import Retrato1 from "../../assets/imgs/portrait_lady.jpg";
import Retrato2 from "../../assets/imgs/portrait_side.jpg";

function Portfolio() {
  const illustracao = [Illustracao, Illus2, Illus3, Illus4, Illus5];
  const meioCorpo = [MeioCorpo, MeioCorpo1, MeioCorpo2];
  const retratos = [Retrato, Retrato1, Retrato2];

  const [scrollIndex, setScrollIndex] = useState({
    illustracao: 0,
    meioCorpo: 0,
    retratos: 0,
  });

  const [minHeights, setMinHeights] = useState({
    illustracao: 250,
    meioCorpo: 250,
    retratos: 250,
  });

  const refs = useMemo(
    () => ({
      illustracao: { current: [] },
      meioCorpo: { current: [] },
      retratos: { current: [] },
    }),
    []
  );

  useEffect(() => {
    const updateMinHeight = (key) => {
      const heights = refs[key].current.map((ref) => ref?.naturalHeight || 0);
      const min = Math.min(...heights.filter(Boolean));
      if (min > 0) {
        setMinHeights((prev) => ({ ...prev, [key]: min }));
      }
    };

    updateMinHeight("illustracao");
    updateMinHeight("meioCorpo");
    updateMinHeight("retratos");
  }, [refs]);

  const handleScroll = (key, direction, length) => {
    setScrollIndex((prev) => {
      const current = prev[key];
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

  const renderCarousel = (key, images) => (
    <div className={styles.slider_container}>
      <button
        className={styles.slider_button}
        onClick={() => handleScroll(key, "prev", images.length)}
      >
        &lt;
      </button>
      <div
        className={styles.portfolio_art_slide}
        style={{ height: `${minHeights[key]}px` }}
      >
        <div
          className={styles.slide_track}
          style={{ transform: `translateX(-${scrollIndex[key] * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="portfolio"
              ref={(el) => (refs[key].current[index] = el)}
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
          <img src={JuPerfil} alt="perfil artista" />
          <span className={styles.nome_perfil}>ju.desenhos</span>

          <div className={styles.perfil_bio}>
            <p>
              Oi, sou Julia, artista visual. Minha arte explora cores, formas e
              emoções. Bem-vindo ao meu mundo!
            </p>
            <a
              href="https://artistree.io/pearls.art"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://artistree.io/pearls.art
              <i
                className="fas fa-external-link-alt"
                style={{ marginLeft: "8px" }}
              ></i>
            </a>
          </div>
        </div>

        {/* ILLUSTRACAO CARD */}
        <div className={styles.portfolio_card}>
          <h2 className={styles.titulo}>Illustração</h2>

          <div className={styles.detalhes}>
            <h3>10 dias</h3>
            <p>
              de <span>R$100</span>{" "}
            </p>
          </div>

          {renderCarousel("illustracao", illustracao)}

          <Link to="/comissao" className={styles.botao_card}>
            Comissionar &#10148;
          </Link>
        </div>

        {/* MEIO CORPO CARD */}
        <div className={styles.portfolio_card}>
          <h2 className={styles.titulo}>Meio corpo</h2>

          <div className={styles.detalhes}>
            <h3>10 dias</h3>
            <p>
              de <span>R$100</span>{" "}
            </p>
          </div>

          {renderCarousel("meioCorpo", meioCorpo)}

          <Link to="/comissao" className={styles.botao_card}>
            Comissionar &#10148;
          </Link>
        </div>

        {/* PERFIL CARD */}
        <div className={styles.portfolio_card}>
          <h2 className={styles.titulo}>Meio corpo</h2>

          <div className={styles.detalhes}>
            <h3>10 dias</h3>
            <p>
              de <span>R$100</span>{" "}
            </p>
          </div>

          {renderCarousel("retratos", retratos)}

          <Link to="/comissao" className={styles.botao_card}>
            Comissionar &#10148;
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
