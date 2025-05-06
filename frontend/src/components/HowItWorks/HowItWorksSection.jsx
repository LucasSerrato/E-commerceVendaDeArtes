import styles from './HowItWorksSection.module.css';
import carrinhoIcon from '../../assets/imgs/carrinho_icon.png';
import aceitarIcon from '../../assets/imgs/aceitar.png';
import escreverIcon from '../../assets/imgs/escrever_icon.png';
import garantirIcon from '../../assets/imgs/garantida.png';

function HowItWorksSection() {
    return (
        <section className={styles.howItWorks}>
            <h2>COMO FUNCIONA?</h2>
            <div className={styles.steps}>
                <div className={styles.step}>
                    <img src={carrinhoIcon} alt="Pedido" />
                    <p>Cliente faz o pedido.</p>
                </div>
                <div className={styles.step}>
                    <img src={aceitarIcon} alt="Artista aceita" />
                    <p>Artista aceita e finaliza a arte.</p>
                </div>
                <div className={styles.step}>
                    <img src={escreverIcon} alt="Cliente aprova" />
                    <p>Cliente aprova antes de liberar o dinheiro.</p>
                </div>
                <div className={styles.step}>
                    <img src={garantirIcon} alt="Concluído" />
                    <p>Cliente finaliza o pedido.</p>
                </div>
            </div>
        </section>
    );
}

export default HowItWorksSection;
