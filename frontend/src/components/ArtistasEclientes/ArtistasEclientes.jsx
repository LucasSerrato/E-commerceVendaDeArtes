import styles from "./ArtistasEclientes.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import ghibliArt from '../../assets/imgs/ghibli_art.webp';
import OnePiece from '../../assets/imgs/Op_art.png';
import Jinx from '../../assets/imgs/jinx.jpg';
import Spidersona from '../../assets/imgs/spidersona.jpg';
import African from '../../assets/imgs/african.jpg';
import Background from '../../assets/imgs/background.jpg'
import Perfil from '../../assets/imgs/profile.jpg';
import JuPerfil from '../../assets/imgs/ju_desenhos.jpg';
import CorpoInteiro from '../../assets/imgs/black_character.png';
import Illustracao from '../../assets/imgs/illustration_dragon.jpg';
import MeioCorpo from '../../assets/imgs/half_body.jpg';
import ThreeD from '../../assets/imgs/3d.jpg';
import Retrato from '../../assets/imgs/portrait_asain.jpg';

function ArtistasEclientes() {

    // FUNCAO PARA O BOTAO TOGGLE
    const [isOn, setIsOn] = useState(false);

    const toggle = () => {
        setIsOn(prev => !prev);
    };

    const getRandomColor = () => {
        const cores = ["red", "blue", "pink", "purple", "orange", "brown", "green", "voilet", "lightgreen", "yellow", "beige"];
        return cores[Math.floor(Math.random() * cores.length)];
    }

    return (
        <section className={styles.artistas_container}>
            <h2>
                {isOn
                    ? "Seu pedido, seu estilo, sua arte!"
                    : "Dê vida à sua imaginação com arte personalizada!"}
            </h2>

            <div className={styles.filtros}>
                <nav className={`${styles.navTabs} ${isOn ? styles.hidden : ''}`}>
                    <button type="button">Todos</button>
                    <button type="button">Corpo Inteiro</button>
                    <button type="button">Meio corpo</button>
                    <button type="button">Illustração</button>
                    <button type="button">Retrato</button>
                    <button type="button">3D</button>
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

                // SOLICITAÇÕES DOS CLIENTES SECTION
                <section className={styles.post_grid}>

                    <div className={styles.post_card}>
                        <div className={styles.perfil}>
                            <div className={styles.cor_perfil} style={{ backgroundColor: getRandomColor() }}></div>
                            <span>joao.carlos</span>
                        </div>
                        <p>Estou em busca de um desenho de anime do studio ghibli minha e da minha esposa nesse estilo:</p>

                        <a href={ghibliArt} target="_blank" rel="noopener noreferrer">
                            <img src={ghibliArt} alt="imagem de referencia" />
                        </a> <br />

                        <Link to="/chat" className={styles.botao_aceitar}>
                            Aceitar
                        </Link>
                    </div>

                    <div className={styles.post_card}>
                        <div className={styles.perfil}>
                            <div className={styles.cor_perfil} style={{ backgroundColor: getRandomColor() }}></div>
                            <span>clara</span>
                        </div>
                        <p>Estou em busca de uma artista 3D para fazer um character sheet do meu OC. Vou pagar R$100 para isso</p>

                        <a href={Jinx} target="_blank" rel="noopener noreferrer">
                            <img src={Jinx} alt="imagem de referencia" />
                        </a> <br />

                        <Link to="/chat" className={styles.botao_aceitar}>
                            Aceitar
                        </Link>
                    </div>

                    <div className={styles.post_card}>
                        <div className={styles.perfil}>
                            <div className={styles.cor_perfil} style={{ backgroundColor: getRandomColor() }}></div>
                            <span>anna.a</span>
                        </div>
                        <p>Estou procurando algum artista para desenhar a minha personagem com espressões diferentes no estilo de One piece:</p>

                        <a href={OnePiece} target="_blank" rel="noopener noreferrer">
                            <img src={OnePiece} alt="imagem de referencia" />
                        </a> <br />

                        <Link to="/chat" className={styles.botao_aceitar}>
                            Aceitar
                        </Link>
                    </div>

                    <div className={styles.post_card}>
                        <div className={styles.perfil}>
                            <div className={styles.cor_perfil} style={{ backgroundColor: getRandomColor() }}></div>
                            <span>ju.ju</span>
                        </div>
                        <p>Estou em busca de um desenho da minha amg não tenho estilo especifico, o meu orçamento é ate $50</p> <br />

                        <Link to="/chat" className={styles.botao_aceitar}>
                            Aceitar
                        </Link>
                    </div>

                    <div className={styles.post_card}>
                        <div className={styles.perfil}>
                            <div className={styles.cor_perfil} style={{ backgroundColor: getRandomColor() }}></div>
                            <span>britoo</span>
                        </div>
                        <p>Alguma artista para fazer um desenho nesse estilo? </p> <br />

                        <a href={African} target="_blank" rel="noopener noreferrer">
                            <img src={African} alt="imagem de referencia" />
                        </a> <br />

                        <Link to="/chat" className={styles.botao_aceitar}>
                            Aceitar
                        </Link>
                    </div>

                    <div className={styles.post_card}>
                        <div className={styles.perfil}>
                            <div className={styles.cor_perfil} style={{ backgroundColor: getRandomColor() }}></div>
                            <span>britoo</span>
                        </div>
                        <p>Quero fazer meu Spidersona, alguem interessada? </p> <br />

                        <a href={Spidersona} target="_blank" rel="noopener noreferrer">
                            <img src={Spidersona} alt="imagem de referencia" />
                        </a> <br />

                        <Link to="/chat" className={styles.botao_aceitar}>
                            Aceitar
                        </Link>
                    </div>

                    <div className={styles.post_card}>
                        <div className={styles.perfil}>
                            <div className={styles.cor_perfil} style={{ backgroundColor: getRandomColor() }}></div>
                            <span>britoo</span>
                        </div>
                        <p>Estou procurando um artista que seja bom com fundos </p> <br />

                        <a href={Background} target="_blank" rel="noopener noreferrer">
                            <img src={Background} alt="imagem de referencia" />
                        </a> <br />

                        <Link to="/chat" className={styles.botao_aceitar}>
                            Aceitar
                        </Link>
                    </div>

                </section>
            ) : (

                // DESCUBRA ARTISTAS SECTION
                <section className={styles.artista_grid}>

                    <Link to="/ver_arte">
                        <div className={styles.artista_card}>
                            <div className={styles.imagem_container}>
                                <img src={CorpoInteiro} alt="imagem da artista" />
                                <h4>Corpo Inteiro</h4>
                            </div>

                            <div className={styles.artista}>
                                <div className={styles.artista_perfil}>
                                    <img src={Perfil} alt="perfil artista" />
                                    <span>pearls.art</span>
                                </div>
                                <div className={styles.valor}>
                                    <p>de</p>
                                    <span>R$100</span>
                                </div>
                            </div>
                            <h3>10 dias</h3>
                        </div>
                    </Link>

                    <Link to="/ver_arte">
                        <div className={styles.artista_card}>
                            <div className={styles.imagem_container}>
                                <img src={MeioCorpo} alt="imagem da artista" />
                                <h4>Meio Corpo</h4>
                            </div>

                            <div className={styles.artista}>
                                <div className={styles.artista_perfil}>
                                    <img src={JuPerfil} alt="perfil artista" />
                                    <span>ju.desenhos</span>
                                </div>
                                <div className={styles.valor}>
                                    <p>de</p>
                                    <span>R$100</span>
                                </div>
                            </div>
                            <h3>10 dias</h3>
                        </div>
                    </Link>

                    <Link to="/ver_arte">
                        <div className={styles.artista_card}>
                            <div className={styles.imagem_container}>
                                <img src={Illustracao} alt="imagem da artista" />
                                <h4>Illustração</h4>
                            </div>

                            <div className={styles.artista}>
                                <div className={styles.artista_perfil}>
                                    <img src={JuPerfil} alt="perfil artista" />
                                    <span>ju.desenhos</span>
                                </div>
                                <div className={styles.valor}>
                                    <p>de</p>
                                    <span>R$170</span>
                                </div>
                            </div>
                            <h3>20 dias</h3>
                        </div>
                    </Link>

                    <Link to="/ver_arte">
                        <div className={styles.artista_card}>
                            <div className={styles.imagem_container}>
                                <img src={ThreeD} alt="imagem da artista" />
                                <h4>3D</h4>
                            </div>

                            <div className={styles.artista}>
                                <div className={styles.artista_perfil}>
                                    <img src={ThreeD} alt="perfil artista" />
                                    <span>bia_artes</span>
                                </div>
                                <div className={styles.valor}>
                                    <p>de</p>
                                    <span>R$200</span>
                                </div>
                            </div>
                            <h3>20 dias</h3>
                        </div>
                    </Link>

                    <Link to="/ver_arte">
                        <div className={styles.artista_card}>
                            <div className={styles.imagem_container}>
                                <img src={Retrato} alt="imagem da artista" />
                                <h4>Retrato</h4>
                            </div>

                            <div className={styles.artista}>
                                <div className={styles.artista_perfil}>
                                    <img src={Retrato} alt="perfil artista" />
                                    <span>pedro.jj</span>
                                </div>
                                <div className={styles.valor}>
                                    <p>de</p>
                                    <span>R$60</span>
                                </div>
                            </div>
                            <h3>5 dias</h3>
                        </div>
                    </Link>
                </section>
            )}
        </section>
    );
}

export default ArtistasEclientes;