import { useOutletContext, Navigate } from "react-router-dom";
import styles from './styles/Pagamentos.module.css';
import { useState } from 'react';

function Pagamentos() {
    const { role } = useOutletContext();
    const [metodoSelecionado, setMetodoSelecionado] = useState("PayPal");

    if (role !== 'artista') return <Navigate to="/conta/perfil" replace />;

    const bancos = [
        {
            nome: "PayPal",
            descricao: "Receba pagamentos via PayPal. Para vender anonimamente, conecte uma conta empresarial PayPal.",
            botao: "Ver detalhes",
            icone: "/icons/paypal.svg"
        },
        {
            nome: "NU Bank",
            descricao: "Receba por Pix ou NuPay direto na sua conta do Nubank.",
            botao: "Conectar",
            icone: "/icons/nubank.svg"
        },
        {
            nome: "Itaú Unibanco",
            descricao: "Receba pagamentos por Pix ou depósito na sua conta Itaú.",
            botao: "Conectar",
            icone: "/icons/itau.png"
        },
        {
            nome: "Banco do Brasil",
            descricao: "Receba via Pix ou boleto bancário. Suporta contas empresariais.",
            botao: "Conectar",
            icone: "/icons/bb.png"
        },
        {
            nome: "Bradesco",
            descricao: "Aceita Pix e cartão de crédito via Bradesco. É necessário possuir conta PJ.",
            botao: "Conectar",
            icone: "/icons/bradesco.png"
        },
        {
            nome: "Caixa",
            descricao: "Ideal para contas poupança ou benefícios sociais. Suporta Pix.",
            botao: "Conectar",
            icone: "/icons/caixa.svg"
        },
        {
            nome: "Santander",
            descricao: "Receba via Pix ou cartão através do Getnet. Integra com contas Santander.",
            botao: "Conectar",
            icone: "/icons/santander.png"
        }
    ];

    return (
        <section className={styles.pagamentos_container}>
            <h2>Receber pagamentos usando:</h2>

            <div className={styles.pagamento_selector}>
                {bancos.map(b => (
                    <button
                        key={b.nome}
                        className={`${styles.selector_button} ${metodoSelecionado === b.nome ? styles.selected : ''}`}
                        onClick={() => setMetodoSelecionado(b.nome)}
                    >
                        {b.nome}
                    </button>
                ))}
            </div>

            <div className={styles.section}>
                <h3>Moeda:</h3>
                <p>Escolha a moeda em que seus clientes irão pagar. Alterar a moeda não afeta comissões já existentes.</p>
                <div className={styles.currency}>
                    <select>
                        <option value="BRL">R$ Real Brasileiro</option>
                        <option value="USD">$ Dólar Americano</option>
                    </select>
                    <button disabled>Salvar</button>
                </div>
            </div>

            <hr />

            {bancos.map((banco) => (
                metodoSelecionado === banco.nome && (
                    <div key={banco.nome} className={styles.bank_box}>
                        <div className={styles.bank_info}>
                            <img src={banco.icone} alt={banco.nome} className={styles.icon} />
                            <div>
                                <h4>{banco.nome}</h4>
                                <p>{banco.descricao}</p>
                            </div>
                        </div>
                        <button className={styles.action_button}>{banco.botao}</button>
                    </div>
                )
            ))}
        </section>
    );
}

export default Pagamentos;
