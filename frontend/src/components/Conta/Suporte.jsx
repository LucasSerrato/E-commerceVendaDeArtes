import styles from "./styles/Suporte.module.css";
import { useState } from "react";

function Suporte() {
  const [ativa, setAtiva] = useState(null);

  // FAQ
  const perguntas = [
    {
      pergunta: "Qual forma de pagamento posso usar?",
      resposta:
        "Você pode usar cartão de crédito, débito, Pix e mais opções integradas à nossa plataforma.",
    },
    {
      pergunta: "Posso ter segurança na minha compra?",
      resposta: "Sim! Utilizamos criptografia e métodos de pagamento seguros.",
    },
    {
      pergunta: "Como faço para adicionar minhas artes?",
      resposta:
        'Acesse seu perfil clique em "Editar portfolio" e clique em "Adicionar nova arte".',
    },
    {
      pergunta: "Como envio uma proposta para um projeto no mural?",
      resposta: 'Clique em "Post" e envie sua proposta com valor e prazo.',
    },
    {
      pergunta: "Como faço para acompanhar o andamento de um pedido?",
      resposta:
        "Você pode acompanhar o status do pedido diretamente no seu painel",
    },
    {
      pergunta: "É seguro contratar ou vender por aqui?",
      resposta:
        "Sim! Toda transação é protegida, e os pagamentos são liberados ao artista apenas após a aprovação do c para ambos os lados.",
    },
    {
      pergunta: "O que acontece se houver um problema com a entrega?",
      resposta:
        "Nos casos de atraso, não conformidade ou disputa, nossa equipe de suporte pode intermediar e ajudar a resolver a situação.",
    },
  ];

  const toggle = (index) => {
    setAtiva(ativa === index ? null : index);
  };

  return (
    <div className={styles.suporte_title}>
      <h1>
        <i class="fa fa-headphones"></i>Suporte{" "}
      </h1>

      <section className={styles.suporte_container}>
        {/* FAQ */}
        <h2>Perguntas Frequentes (FAQ)</h2>

        <div className={styles.faq_container}>
          {perguntas.map((item, index) => (
            <div key={index} className={styles.faq_item}>
              <button
                className={styles.faq_pergunta}
                onClick={() => toggle(index)}
              >
                {item.pergunta}
                <i
                  className={`fas ${
                    ativa === index ? "fa-angle-up" : "fa-angle-down"
                  }`}
                ></i>
              </button>
              {ativa === index && (
                <div className={styles.faq_resposta}>{item.resposta}</div>
              )}
            </div>
          ))}
        </div>

        <h2>📩 Ainda precisa de ajuda?</h2>
        <h4>
          Não encontrou a resposta que procurava? Entre em contato com a gente:
        </h4>
        <div className={styles.suporte_links}>
          <ul>
            <li>
              <a href="mailto:suporte@framewix.com">
                <span>E-mail:</span> suporte@framewix.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5511912345678"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>WhatsApp:</span> (11) 91234-5678
              </a>
            </li>
          </ul>
        </div>
        <h4>
          Atendimento de segunda a sexta, das 9h às 18h (horário de Brasília).
        </h4>
      </section>
    </div>
  );
}

export default Suporte;
