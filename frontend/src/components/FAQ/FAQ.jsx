import { useState } from 'react';
import styles from './FAQ.module.css';

function Faq() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const questions = [
        {
            question: "Qual forma de pagamento posso usar?",
            answer: "Você pode usar cartão de crédito, débito, Pix e mais opções integradas à nossa plataforma."
        },
        {
            question: "Posso ter segurança na minha compra?",
            answer: "Sim, a plataforma segura o pagamento até o cliente aprovar a arte final entregue pelo artista."
        },
        {
            question: "Quais os tipos de comissões que posso postar?",
            answer: "Arte digital, retratos, personagens, ilustrações personalizadas e muito mais."
        },
        {
            question: "Qualquer pessoa pode usar o Pixxl?",
            answer: "Sim! Tanto artistas quanto clientes podem se cadastrar gratuitamente e começar a usar agora."
        }
    ];

    return (
        <section className={styles.faqSection}>
            <h2 className={styles.title}>FAQ</h2>
            <div className={styles.faqList}>
                {questions.map((q, i) => (
                    <div key={i} className={styles.faqItem}>
                        <button className={styles.question} onClick={() => toggle(i)}>
                            {q.question}
                        </button>
                        <div className={`${styles.answer} ${activeIndex === i ? styles.active : ''}`}>
                            {q.answer}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Faq;
