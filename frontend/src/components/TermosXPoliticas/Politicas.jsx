import styles from "./Styles.module.css";

function Politicas() {
  return (
    <section className={styles.politicas_container}>
      <div className={styles.container}>
        <h1>Política de Privacidade</h1>

        <p>
          Na FrameWix, levamos a sua privacidade a sério. Esta Política de
          Privacidade tem como objetivo explicar de forma clara e transparente
          como seus dados pessoais são coletados, utilizados, armazenados e
          protegidos.
        </p>

        <h2>1. Dados Coletados</h2>
        <p>
          Coletamos apenas os dados essenciais para o funcionamento da
          plataforma, incluindo:
        </p>
        <ul>
          <li>
            Informações de cadastro: nome, e-mail e demais dados fornecidos no
            registro;
          </li>
          <li>
            Dados de pagamento: processados por meio de gateways seguros e
            criptografados;
          </li>
          <li>Mensagens e interações via chat interno;</li>
          <li>
            Informações de navegação: como endereço IP, cookies e registros de
            acesso.
          </li>
        </ul>

        <h2>2. Finalidade do Uso dos Dados</h2>
        <p>Seus dados são utilizados para:</p>
        <ul>
          <li>
            Fornecer, operar e melhorar os serviços oferecidos na plataforma;
          </li>
          <li>Processar pagamentos, reembolsos e transações com segurança;</li>
          <li>
            Manter a segurança e integridade da plataforma e de seus usuários;
          </li>
          <li>Cumprir com obrigações legais e regulatórias.</li>
        </ul>

        <h2>3. Consentimento</h2>
        <p>
          Ao aceitar esta Política de Privacidade, você autoriza expressamente a
          coleta, uso e tratamento de seus dados conforme descrito.
        </p>
        <p>
          Esse consentimento pode ser revogado a qualquer momento, conforme item
          6.
        </p>

        <h2>4. Compartilhamento de Dados</h2>
        <p>Seus dados nunca serão vendidos.</p>
        <p>O compartilhamento de informações ocorre apenas com:</p>
        <ul>
          <li>
            Parceiros essenciais para a operação da plataforma, como gateways de
            pagamento;
          </li>
          <li>
            Autoridades legais ou regulatórias, quando houver obrigação legal.
          </li>
        </ul>

        <h2>5. Retenção dos Dados</h2>
        <p>Os dados serão armazenados apenas pelo tempo necessário para:</p>
        <ul>
          <li>A prestação adequada dos serviços contratados;</li>
          <li>
            O cumprimento de obrigações legais, regulatórias e contratuais.
          </li>
        </ul>

        <h2>6. Direitos do Usuário</h2>
        <p>Você tem total controle sobre seus dados pessoais. É possível:</p>
        <ul>
          <li>Acessar, corrigir ou excluir suas informações;</li>
          <li>Solicitar a portabilidade dos dados;</li>
          <li>Revogar o consentimento para o tratamento de dados;</li>
          <li>
            Obter informações detalhadas sobre como seus dados são tratados.
          </li>
        </ul>
        <p>
          Para exercer esses direitos, entre em contato pelos canais
          disponíveis.
        </p>

        <h2>7. Contato</h2>
        <p>
          Se você tiver dúvidas, sugestões ou solicitações relacionadas à sua
          privacidade ou ao tratamento de dados, entre em contato conosco pelo
          e-mail de suporte da plataforma.
        </p>

        <p>
          Esta Política poderá ser atualizada periodicamente. Recomendamos que
          você a revise regularmente para estar ciente de eventuais mudanças.
        </p>
      </div>
    </section>
  );
}

export default Politicas;
