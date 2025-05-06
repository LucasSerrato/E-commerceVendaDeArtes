import styles from './HeroSection.module.css';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    // AVEGAR O BOTAO PARA A TELA DE ARTISTAS
    const navigate = useNavigate();

    return (
        <section className={styles.hero}>

            <h1>Plataforma de artistas independentes</h1>

            <div className={styles.searchBox}>
                <input type="text" placeholder="Descreva sua arte" />
            </div>

            <button
                className={styles.button}
                onClick={() => navigate('/artistas_clientes')}
            >
                Descubra artistas
            </button>

        </section>
    );
}

export default HeroSection;
