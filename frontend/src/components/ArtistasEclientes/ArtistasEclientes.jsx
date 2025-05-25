import styles from "./ArtistasEclientes.module.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { urlToFile } from "../../utils/fileUtils";  // ajuste o caminho conforme sua estrutura


function ArtistasEclientes() {
  const [imagensArtista, setImagensArtista] = useState([]);
  const [filtroSelecionado, setFiltroSelecionado] = useState("Todos");
  const location = useLocation();
  const navigate = useNavigate();
  // Estado para pesquisa
  const [pesquisa, setPesquisa] = useState("");

  const enviarMensagemAceite = async (post) => {
    // Envia a mensagem de aceite, incluindo clienteId no body se quiser
    await fetch("http://localhost:8080/api/mensagemchat", {
      method: "POST",
      body: JSON.stringify({ id: post.id, clienteId: post.clienteId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Navega para mensagens, incluindo clienteId na query
    navigate(`/mensagens?id=${post.id}&nome=${encodeURIComponent(post.nomeUsuario)}&clienteId=${post.clienteId}`);
  };

  // Função para pegar query param 'busca' da URL
  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param) || "";
  };

  // Verifica se a rota atual é a de solicitações dos clientes
  const isOn = location.pathname.includes("solicitacoes");

  // Trocar entre artistas e solicitações usando navegação
  const toggle = () => {
    // Ao trocar de aba, limpa a pesquisa
    setPesquisa("");
    navigate(isOn ? "/artistas_clientes" : "/artistas_clientes/solicitacoes");
  };

  // Cores aleatórias para o perfil dos clientes
  const getRandomColor = () => {
    const cores = [
      "red",
      "blue",
      "pink",
      "purple",
      "orange",
      "brown",
      "green",
      "violet",
      "lightgreen",
      "yellow",
      "beige",
    ];
    return cores[Math.floor(Math.random() * cores.length)];
  };

  // Buscar imagens da artistas ou solicitações
  useEffect(() => {
    const url = isOn
      ? "http://localhost:8080/api/comentariocliimgs/dados" // solicitações dos clientes
      : "http://localhost:8080/api/portfolioimgs"; // artistas

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const shuffledData = shuffleArray(data);
        setImagensArtista(shuffledData);
        setFiltroSelecionado("Todos"); // resetar filtro ao mudar de aba
      })
      .catch((err) => {
        console.error("Erro ao buscar imagens:", err);
      });
  }, [isOn]);

  useEffect(() => {
    setPesquisa(getQueryParam("busca"));
  }, [location.search]);

  const shuffleArray = (array) => {
    let newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // Filtrar imagens baseado no filtroSelecionado e no texto da pesquisa (ignora maiúsculas/minúsculas)
  const imagensFiltradas = imagensArtista.filter((imgData) => {
    // Se estiver na aba de solicitações (isOn), só filtra pela pesquisa no nomeUsuario e descrição
    if (isOn) {
      if (!pesquisa) return true;
      const termo = pesquisa.toLowerCase();
      return (
        imgData.nomeUsuario?.toLowerCase().includes(termo) ||
        imgData.descricao?.toLowerCase().includes(termo)
      );
    }

    // Na aba artistas, primeiro filtra pelo filtroSelecionado (tipo_arte) e depois pela pesquisa
    if (filtroSelecionado !== "Todos") {
      if (
        !imgData.portfolio?.tipo_arte
          ?.toLowerCase()
          .includes(filtroSelecionado.toLowerCase())
      )
        return false;
    }

    if (!pesquisa) return true;

    const termo = pesquisa.toLowerCase();

    return (
      imgData.portfolio?.tipo_arte?.toLowerCase().includes(termo) ||
      imgData.portfolio?.artista?.nome?.toLowerCase().includes(termo)
    );
  });

  return (
    <section className={styles.artistas_container}>
      <h2>
        {isOn
          ? "Seu pedido, seu estilo, sua arte!"
          : "Dê vida à sua imaginação com arte personalizada!"}
      </h2>

      <div className={styles.filtros}>
        <nav className={`${styles.navTabs} ${isOn ? styles.hidden : ""}`}>
          {/* Botões de filtro: ao clicar atualiza filtroSelecionado */}
          <button
            type="button"
            className={filtroSelecionado === "Todos" ? styles.active : ""}
            onClick={() => setFiltroSelecionado("Todos")}
          >
            Todos
          </button>
          <button
            type="button"
            className={
              filtroSelecionado === "Corpo Inteiro" ? styles.active : ""
            }
            onClick={() => setFiltroSelecionado("Corpo Inteiro")}
          >
            Corpo Inteiro
          </button>
          <button
            type="button"
            className={filtroSelecionado === "Meio corpo" ? styles.active : ""}
            onClick={() => setFiltroSelecionado("Meio corpo")}
          >
            Meio corpo
          </button>
          <button
            type="button"
            className={filtroSelecionado === "Ilustração" ? styles.active : ""}
            onClick={() => setFiltroSelecionado("Ilustração")}
          >
            Ilustração
          </button>
          <button
            type="button"
            className={filtroSelecionado === "Retrato" ? styles.active : ""}
            onClick={() => setFiltroSelecionado("Retrato")}
          >
            Retrato
          </button>
          <button
            type="button"
            className={filtroSelecionado === "3D" ? styles.active : ""}
            onClick={() => setFiltroSelecionado("3D")}
          >
            3D
          </button>
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
                <h6>{post.nomeUsuario}</h6>
                <span className={styles.data_post}>
                  {post.data
                    ? new Intl.DateTimeFormat("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
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
              <button
                className={styles.botao_aceitar}
                onClick={() => enviarMensagemAceite(post)}
              >
                Enviar mensagem
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          ))}
        </section>
      ) : (
        // Descubra artistas
        <section className={styles.artista_grid}>
          {imagensFiltradas.map((imgData) =>
            imgData.portfolio ? (
              <Link
                to={`/ver_arte/${imgData.portfolio.artista?.id}?portfolio=${imgData.portfolio?.id}`}
                key={imgData.id}
              >
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
