import styles from './Styles.module.css';

function Termos() {
    return (
        <section className={styles.termos_container}>
            <div className={styles.container}>
            <h1>Termos de Uso </h1>

            <h3 className={styles.bem_vindo}>Bem-vindo ao FrameWix!</h3>
            <p>Ao acessar ou utilizar nossa plataforma de compra e venda de artes digitais personalizadas, você concorda com os termos e condições descritos abaixo.</p>

            <h2>1. Objetivo do Site</h2>
            <p>O FrameWix oferece um ambiente seguro e intuitivo para que:</p>
            <ul>
                <li>Artistas possam divulgar e vender suas artes digitais personalizadas;</li>
                <li>Clientes possam contratar e adquirir essas artes;</li>
                <li>Ambas as partes se comuniquem por meio de um sistema de chat integrado.</li>
            </ul>

            <h2>2. Cadastro e Conta do Usuário</h2>
            <p>Para utilizar os serviços da plataforma, é necessário realizar um cadastro com informações verídicas.</p>
            <p>O usuário é responsável por manter a confidencialidade de suas credenciais de acesso.</p>
            <p>Reservamo-nos o direito de suspender ou excluir contas que violem estes Termos de Uso ou apresentem comportamento inadequado.</p>

            <h2>3. Direitos Autorais</h2>
            <p>O artista mantém os direitos autorais sobre a obra, salvo acordo contrário entre as partes.</p>
            <p>É proibido o uso não autorizado das artes adquiridas, incluindo reprodução, distribuição ou revenda.</p>

            <h2>4. Pagamentos e Reembolsos</h2>
            <p>Os pagamentos são realizados por meio dos métodos disponibilizados na plataforma.</p>
            <p>Conforme o Art. 49 do Código de Defesa do Consumidor, o cliente tem até 7 dias após a compra para solicitar reembolso.</p>
            <p>Disputas serão avaliadas individualmente pela equipe de suporte do FrameWix.</p>

            <h2>5. Conduta do Usuário</h2>
            <p>É expressamente proibido:</p>
            <ul>
                <li>Publicar conteúdo ofensivo, ilegal ou que infrinja direitos de terceiros;</li>
                <li>Tentar fraudar o sistema ou comprometer a segurança da plataforma;</li>
                <li>Utilizar a plataforma para fins diferentes dos previstos.</li>
            </ul>

            <h2>6. Limitação de Responsabilidade</h2>
            <p>O FrameWix atua apenas como intermediador entre artistas e clientes, e não se responsabiliza por atrasos, conflitos ou insatisfações decorrentes dessas relações.</p>

            <h2>7. Política de Conteúdo e Uso de Imagens</h2>
            <p>O site não permite o compartilhamento público das artes criadas sem autorização expressa do cliente.</p>
            <p>É terminantemente proibido:</p>
            <ul>
                <li>O uso de inteligência artificial nas artes vendidas;</li>
                <li>Qualquer conteúdo que faça apologia à pedofilia, ao nazismo, à violência extrema (gore);</li>
                <li>Temática furry com conteúdo adulto (+18).</li>
            </ul>
            <p>Conteúdos que violem essas diretrizes serão removidos imediatamente, e o usuário poderá ser banido da plataforma.</p>

            <h2>Disposições Finais</h2>
            <p>A utilização do FrameWix implica na aceitação integral destes Termos de Uso. Reservamo-nos o direito de atualizá-los a qualquer momento.</p>
            </div>
        </section>
    );
}

export default Termos;
