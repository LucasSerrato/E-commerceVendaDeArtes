import styles from "./ArtistasEclientes.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import ghibliArt from '../../assets/imgs/ghibli_art.webp';
import OnePiece from '../../assets/imgs/Op_art.png';
import Jinx from '../../assets/imgs/jinx.jpg';
import Spidersona from '../../assets/imgs/spidersona.jpg';
import African from '../../assets/imgs/african.jpg';
import Background from '../../assets/imgs/background.jpg';
import Perfil from '../../assets/imgs/profile.jpg';
import JuPerfil from '../../assets/imgs/ju_desenhos.jpg';
import CorpoInteiro from '../../assets/imgs/black_character.png';
import Illustracao from '../../assets/imgs/illustration_dragon.jpg';
import MeioCorpo from '../../assets/imgs/half_body.jpg';
import ThreeD from '../../assets/imgs/3d.jpg';
import Retrato from '../../assets/imgs/portrait_asain.jpg';

function ArtistasEclientes({ searchTerm }) {
    const [isOn, setIsOn] = useState(false);
    const [filtro, setFiltro] = useState("Todos");

    const toggle = () => setIsOn(prev => !prev);

    const artistas = [
        {
            tipo: "Corpo Inteiro",
            imagem: CorpoInteiro,
            perfilImg: Perfil,
            nome: "pearls.art",
            preco: "R$100",
            prazo: "10 dias"
        },
        {
            tipo: "Meio corpo",
            imagem: MeioCorpo,
            perfilImg: JuPerfil,
            nome: "ju.desenhos",
            preco: "R$100",
            prazo: "10 dias"
        },
        {
            tipo: "Illustração",
            imagem: Illustracao,
            perfilImg: JuPerfil,
            nome: "ju.desenhos",
            preco: "R$170",
            prazo: "20 dias"
        },
        {
            tipo: "3D",
            imagem: ThreeD,
            perfilImg: ThreeD,
            nome: "bia_artes",
            preco: "R$200",
            prazo: "20 dias"
        },
        {
            tipo: "Retrato",
            imagem: Retrato,
            perfilImg: Retrato,
            nome: "pedro.jj",
            preco: "R$60",
            prazo: "5 dias"
        }
    ];

    const artistasFiltrados = artistas.filter((artista) => {
        const correspondeTipo = filtro === "Todos" || artista.tipo.toLowerCase() === filtro.toLowerCase();
        const termo = searchTerm.toLowerCase();

        const correspondePesquisa =
            artista.nome.toLowerCase().includes(termo) ||
            artista.tipo.toLowerCase().includes(termo) ||
            artista.preco.toLowerCase().includes(termo);

        return correspondeTipo && correspondePesquisa;
    });

    return (
        <section className={styles.artistas_container}>
            <h2>
                {isOn
                    ? "Seu pedido, seu estilo, sua arte!"
                    : "Dê vida à sua imaginação com arte personalizada!"}
            </h2>

            <div className={styles.filtros}>
                <nav className={`${styles.navTabs} ${isOn ? styles.hidden : ''}`}>
                    {["Todos", "Corpo Inteiro", "Meio corpo", "Illustração", "Retrato", "3D"].map((tipo) => (
                        <button
                            key={tipo}
                            type="button"
                            onClick={() => setFiltro(tipo)}
                            className={filtro === tipo ? styles.active : ""}
                        >
                            {tipo}
                        </button>
                    ))}
                </nav>

                <div className={styles.switchContainer} onClick={toggle}>
                    <div className={`${styles.switch} ${isOn ? styles.on : ''}`}>
                        <div className={styles.slider}></div>
                    </div>
                    <span className={styles.label}>
                        {isOn ? "Descubra artistas" : "Solicitações dos clientes"}
                    </span>
                </div>
            </div>

            {isOn ? (
                <section className={styles.post_grid}>
                    {/* Cards de solicitações dos clientes */}
                </section>
            ) : (
                <section className={styles.artista_grid}>
                    {artistasFiltrados.map((artista, index) => (
                        <Link to="/ver_arte" key={index}>
                            <div className={styles.artista_card}>
                                <div className={styles.imagem_container}>
                                    <img src={artista.imagem} alt="imagem da artista" />
                                    <h4>{artista.tipo}</h4>
                                </div>

                                <div className={styles.artista}>
                                    <div className={styles.artista_perfil}>
                                        <img src={artista.perfilImg} alt="perfil artista" />
                                        <span>{artista.nome}</span>
                                    </div>
                                    <div className={styles.valor}>
                                        <p>de</p>
                                        <span>{artista.preco}</span>
                                    </div>
                                </div>
                                <h3>{artista.prazo}</h3>
                            </div>
                        </Link>
                    ))}
                </section>
            )}
        </section>
    );
}

export default ArtistasEclientes;
