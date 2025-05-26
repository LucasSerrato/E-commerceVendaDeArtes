import styles from "./FeatureSection.module.css";

function FeatureSection() {
  return (
    <section className={styles.featuresWrapper}>
      {/* Vídeo em background */}
      <div className={styles.videoBackground}>
        <iframe
          src="https://www.youtube.com/embed/Kpf4zf0D9mQ?autoplay=1&mute=1&loop=1&playlist=Kpf4zf0D9mQ"
          title="Pixxl Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

      {/* Conteúdo sobreposto */}
      <div className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.emoji}>🎨</div>
          <h3>VENDA SUA ARTE</h3>
          <p>
            Os preços variam dependendo do tipo de arte, da complexidade do
            pedido e do tamanho.
          </p>
        </div>

        <div className={styles.feature}>
          <div className={styles.emoji}>💡</div>
          <h3>PORQUE USAR FRAMEWIX</h3>
          <p>
            Fácil de usar, seguro e com visibilidade para os artistas se
            destacarem.
          </p>
        </div>

        <div className={styles.feature}>
          <div className={styles.emoji}>🔒</div>
          <h3>COMPRA GARANTIDA</h3>
          <p>
            O pagamento só é liberado após aprovação do cliente, garantindo
            confiança.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
