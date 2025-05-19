import styles from "./ArtistasEclientes.module.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function ArtistasEclientes() {
  const [imagensArtista, setImagensArtista] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Verifica se a rota atual é a de solicitações dos clientes
  const isOn = location.pathname.includes("solicitacoes");

  // Trocar entre artistas e solicitações usando navegação
  const toggle = () => {
    navigate(isOn ? "/artistas_clientes" : "/artistas_clientes/solicitacoes");
  };

  // Cores aleatórias para o perfil dos clientes
  const getRandomColor = () => {
    const cores = [
      "red", "blue", "pink", "purple", "orange", "brown",
      "green", "voilet", "lightgreen", "yellow", "beige",
    ];
    return cores[Math.floor(Math.random() * cores.length)];
  };

  // Buscar imagens (artistas ou solicitações)
  useEffect(() => {
    const url = isOn
      ? "http://localhost:8080/api/comentariocliimgs/dados" // solicitações dos clientes
      : "http://localhost:8080/api/portfolioimgs"; // artistas

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const shuffledData = shuffleArray(data);
        setImagensArtista(shuffledData);
      })
      .catch((err) => {
        console.error("Erro ao buscar imagens:", err);
      });
  }, [isOn]);

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
          <button type="button">Ilustração</button>
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
        // Solicitacoes dos clientes
        <section className={styles.post_grid}>
          {imagensArtista.map((post) => (
            <div className={styles.post_card} key={post.id}>
              <div className={styles.perfil}>
                <div
                  className={styles.cor_perfil}
                  style={{ backgroundColor: getRandomColor() }}
                ></div>
                <span>{post.nomeUsuario}</span>
                <span className={styles.data_post}>
                  {post.data
                    ? new Intl.DateTimeFormat("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(post.data))
                    : "Data indisponível"}
                </span>
              </div>
              <p>{post.descricao}</p>
              {post.imagem && (
                <a
                  href={`http://localhost:8080/api/comentariocliimgs/imagem/${post.imagem}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`http://localhost:8080/api/comentariocliimgs/imagem/${post.imagem}`}
                    alt="imagem de referência"
                  />
                </a>
              )}
              <br />
              <Link to="/mensagens" className={styles.botao_aceitar}>
                Aceitar
              </Link>
            </div>
          ))}
        </section>
      ) : (
        // Descubra artistas
        <section className={styles.artista_grid}>
          {imagensArtista.map((imgData) =>
            imgData.portfolio ? (
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
                        src={`http://localhost:8080/api/clientes/imagem/${imgData.portfolio.artista?.imagem}`}
                        alt="Perfil do artista"
                      />
                      <span>{imgData.portfolio.artista?.nome}</span>
                    </div>

                    <div className={styles.valor}>
                      <p>de</p>
                      <span>R${imgData.portfolio.preco}</span>
                    </div>
                  </div>

                  <h3>{imgData.portfolio.prazo} dias</h3>
                </div>
              </Link>
            ) : null
          )}
        </section>
      )}
    </section>
  );
}

export default ArtistasEclientes;
