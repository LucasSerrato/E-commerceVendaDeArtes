import styles from "./ArtistasEclientes.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ghibliArt from "../../assets/imgs/ghibli_art.webp";
import OnePiece from "../../assets/imgs/Op_art.png";
import Jinx from "../../assets/imgs/jinx.jpg";
import Spidersona from "../../assets/imgs/spidersona.jpg";
import African from "../../assets/imgs/african.jpg";
import Background from "../../assets/imgs/background.jpg";

function ArtistasEclientes() {
  const [imagensArtista, setImagensArtista] = useState([]);
  const [isOn, setIsOn] = useState(false);

  // FUNCAO PARA O BOTAO TOGGLE
  const toggle = () => {
    setIsOn((prev) => !prev);
  };

  // FUNCAO COR ALEATORIA PARA OS CLIENTES
  const getRandomColor = () => {
    const cores = [
      "red",
      "blue",
      "pink",
      "purple",
      "orange",
      "brown",
      "green",
      "voilet",
      "lightgreen",
      "yellow",
      "beige",
    ];
    return cores[Math.floor(Math.random() * cores.length)];
  };

  // FUNCAO FETCH DAS IMAGENS DO PORTFOLIO
  useEffect(() => {
    if (!isOn) {
      fetch(`http://localhost:8080/api/portfolioimgs`)
        .then((res) => res.json())
        .then((data) => {
          const shuffledData = shuffleArray(data);
          setImagensArtista(shuffledData);
        })
        .catch((err) => {
          console.error("Erro ao buscar imagens:", err);
        });
    }
  }, [isOn]);

  // FUNCAO MISTURAR PORTFOLIO
  const shuffleArray = (array) => {
    let newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  return (
    <section className={styles.artistas_container}>
      <h2>
        {isOn
          ? "Seu pedido, seu estilo, sua arte!"
          : "Dê vida à sua imaginação com arte personalizada!"}
      </h2>

      <div className={styles.filtros}>
        <nav className={`${styles.navTabs} ${isOn ? styles.hidden : ""}`}>
          <button type="button">Todos</button>
          <button type="button">Corpo Inteiro</button>
          <button type="button">Meio corpo</button>
          <button type="button">Illustração</button>
          <button type="button">Retrato</button>
          <button type="button">3D</button>
        </nav>

        <div className={styles.switchContainer} onClick={toggle}>
          <div className={`${styles.switch} ${isOn ? styles.on : ""}`}>
            <div className={styles.slider}></div>
          </div>
          <span className={styles.label}>
            {isOn ? "Descubra artistas" : "Solicitações dos clientes"}
          </span>
        </div>
      </div>

      {isOn ? (
        // SOLICITAÇÕES DOS CLIENTES SECTION
        <section className={styles.post_grid}>
          <div className={styles.post_card}>
            <div className={styles.perfil}>
              <div
                className={styles.cor_perfil}
                style={{ backgroundColor: getRandomColor() }}
              ></div>
              <span>joao.carlos</span>
            </div>
            <p>
              Estou em busca de um desenho de anime do studio ghibli minha e da
              minha esposa nesse estilo:
            </p>
            <a href={ghibliArt} target="_blank" rel="noopener noreferrer">
              <img src={ghibliArt} alt="imagem de referencia" />
            </a>{" "}
            <br />
            <Link to="/chat" className={styles.botao_aceitar}>
              Aceitar
            </Link>
          </div>

          <div className={styles.post_card}>
            <div className={styles.perfil}>
              <div
                className={styles.cor_perfil}
                style={{ backgroundColor: getRandomColor() }}
              ></div>
              <span>clara</span>
            </div>
            <p>
              Estou em busca de uma artista 3D para fazer um character sheet do
              meu OC. Vou pagar R$100 para isso
            </p>
            <a href={Jinx} target="_blank" rel="noopener noreferrer">
              <img src={Jinx} alt="imagem de referencia" />
            </a>{" "}
            <br />
            <Link to="/chat" className={styles.botao_aceitar}>
              Aceitar
            </Link>
          </div>

          <div className={styles.post_card}>
            <div className={styles.perfil}>
              <div
                className={styles.cor_perfil}
                style={{ backgroundColor: getRandomColor() }}
              ></div>
              <span>anna.a</span>
            </div>
            <p>
              Estou procurando algum artista para desenhar a minha personagem
              com espressões diferentes no estilo de One piece:
            </p>
            <a href={OnePiece} target="_blank" rel="noopener noreferrer">
              <img src={OnePiece} alt="imagem de referencia" />
            </a>{" "}
            <br />
            <Link to="/chat" className={styles.botao_aceitar}>
              Aceitar
            </Link>
          </div>

          <div className={styles.post_card}>
            <div className={styles.perfil}>
              <div
                className={styles.cor_perfil}
                style={{ backgroundColor: getRandomColor() }}
              ></div>
              <span>ju.ju</span>
            </div>
            <p>
              Estou em busca de um desenho da minha amg não tenho estilo
              especifico, o meu orçamento é ate $50
            </p>{" "}
            <br />
            <Link to="/chat" className={styles.botao_aceitar}>
              Aceitar
            </Link>
          </div>

          <div className={styles.post_card}>
            <div className={styles.perfil}>
              <div
                className={styles.cor_perfil}
                style={{ backgroundColor: getRandomColor() }}
              ></div>
              <span>britoo</span>
            </div>
            <p>Alguma artista para fazer um desenho nesse estilo? </p> <br />
            <a href={African} target="_blank" rel="noopener noreferrer">
              <img src={African} alt="imagem de referencia" />
            </a>{" "}
            <br />
            <Link to="/chat" className={styles.botao_aceitar}>
              Aceitar
            </Link>
          </div>

          <div className={styles.post_card}>
            <div className={styles.perfil}>
              <div
                className={styles.cor_perfil}
                style={{ backgroundColor: getRandomColor() }}
              ></div>
              <span>britoo</span>
            </div>
            <p>Quero fazer meu Spidersona, alguem interessada? </p> <br />
            <a href={Spidersona} target="_blank" rel="noopener noreferrer">
              <img src={Spidersona} alt="imagem de referencia" />
            </a>{" "}
            <br />
            <Link to="/chat" className={styles.botao_aceitar}>
              Aceitar
            </Link>
          </div>

          <div className={styles.post_card}>
            <div className={styles.perfil}>
              <div
                className={styles.cor_perfil}
                style={{ backgroundColor: getRandomColor() }}
              ></div>
              <span>britoo</span>
            </div>
            <p>Estou procurando um artista que seja bom com fundos </p> <br />
            <a href={Background} target="_blank" rel="noopener noreferrer">
              <img src={Background} alt="imagem de referencia" />
            </a>{" "}
            <br />
            <Link to="/chat" className={styles.botao_aceitar}>
              Aceitar
            </Link>
          </div>
        </section>
      ) : (
        // DESCUBRA ARTISTAS SECTION
        <section className={styles.artista_grid}>
          {imagensArtista.map((imgData) => (
            <Link to="/ver_arte" key={imgData.id}>
              <div className={styles.artista_card}>
                <div className={styles.imagem_container}>
                  <img
                    src={`http://localhost:8080/api/portfolioimgs/imagem/${imgData.imagem}`}
                    alt="Imagem da arte"
                  />
                  <h4>{imgData.portfolio.tipo_arte}</h4>
                </div>

                <div className={styles.artista}>
                  <div className={styles.artista_perfil}>
                    <img
                      src={`http://localhost:8080/api/clientes/imagem/${imgData.portfolio.artista.imagem}`}
                      alt="Perfil do artista"
                    />
                    <span>{imgData.portfolio.artista.nome}</span>
                  </div>

                  <div className={styles.valor}>
                    <p>de</p>
                    <span>R${imgData.portfolio.preco}</span>
                  </div>

                </div>
                <h3>{imgData.portfolio.prazo} dias</h3>
              </div>

            </Link>
          ))}
        </section>
      )}
    </section>
  );
}

export default ArtistasEclientes;
