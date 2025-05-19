import styles from './PainelArtista.module.css';
import UploadIcon from '../../assets/imgs/upload_icon.png';
import ImgRef from '../../assets/imgs/back_illus.jpg';
import React, { useState, useRef } from 'react';

function PainelArtista() {
    const [showModal, setShowModal] = useState(false);
    const [pedidoAtivo, setPedidoAtivo] = useState(true);
    const [showNotificacao, setShowNotificacao] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [valor, setValor] = useState('');

    const fileInputRef = useRef(null);

    // Função para formatar o valor como moeda brasileira (R$)
    const formatarValor = (valor) => {
        const numero = Number(valor);
        if (isNaN(numero)) return '';
        return numero.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Selected file:", file);
        }
    };

    const handleAceitar = () => {
        setShowModal(true);
    };

    const handleCancelar = () => {
        setPedidoAtivo(false);
    };

    const aceitarComissao = async () => {
        if (!mensagem || !valor) return;

        try {
            const response = await fetch("http://localhost:8080/api/comissoes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mensagem, valor }),
            });

            if (!response.ok) {
                throw new Error("Erro ao enviar comissão");
            }

            setShowModal(false);
            setShowNotificacao(true);
            setPedidoAtivo(false);
            setTimeout(() => setShowNotificacao(false), 4000);
            setMensagem('');
            setValor('');
        } catch (error) {
            console.error("Erro ao aceitar comissão:", error);
        }
    };

    const handleSubmitModal = (e) => {
        e.preventDefault();
        aceitarComissao();
    };

    return (
        <section className={styles.caixa}>
            <div className={styles.painelArtista_container}>
                {/* PAINEL PEDIDOS */}
                <div className={styles.pedidos_card}>
                    <h2>Pedidos</h2>
                    <h3>Pedidos que aguardam análise</h3>
                    <span>Veja os detalhes e decida se deseja aceitar</span>

                    <div className={styles.card_caixa}>
                        {pedidoAtivo && (
                            <div className={styles.comissao_card}>
                                <h4>joao.carlos</h4>
                                <h4>Tipo: <span>Ilustração</span></h4>
                                <h4>Mensagem: <br />
                                    <span>
                                        Oi! Eu vi que você trabalha muito com backgrounds e cenas,
                                        gostei muito do seu trabalho e quero te comissionar para fazer
                                        algumas cenas nesse estilo:
                                    </span>
                                </h4>
                                <h4>Imagem (s) de referência:</h4>
                                <img src={ImgRef} alt="img de referencia" />

                                <div className={styles.botoes}>
                                    <button className={styles.aceitar} onClick={handleAceitar}>&#10004;</button>
                                    <button className={styles.cancelar} onClick={handleCancelar}>&#10006;</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* PAINEL PAGAMENTOS */}
                <div className={styles.pagamento_card}>
                    <h2>Pagamentos</h2>
                    <h3>Pedidos aceitos, mas ainda sem confirmação de pagamento</h3>
                    <span>O pagamento precisa ser feito antes de iniciar</span>
                    <div className={styles.card_caixa}></div>
                </div>

                {/* PAINEL TRABALHO FINAL */}
                <div className={styles.trabalhoFim_card}>
                    <h2>Em processo</h2>
                    <h3>Pedidos com entregas parciais ou em processo</h3>
                    <span>Você pode atualizar o progresso aqui</span>
                    <div className={styles.card_caixa}>
                        <div onClick={handleClick} className={styles.uploadBox}>
                            <img src={UploadIcon} alt='icon baixar' />
                            <p>Faça upload da imagem aqui</p>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                    <button className={styles.enviar_botao}> Enviar </button>
                </div>

                {/* PAINEL CONCLUSÃO */}
                <div className={styles.conclusao_card}>
                    <h2>Aprovação</h2>
                    <h3>Entregas finais aguardando a aprovação do cliente</h3>
                    <span>Envie o trabalho final e aguarde feedback</span>
                    <div className={styles.card_caixa}></div>
                </div>

                {/* PAINEL CONCLUÍDOS */}
                <div className={styles.concluidos_card}>
                    <h2>Histórico</h2>
                    <h3>Trabalhos já finalizados</h3>
                    <span>Aqui ficam os pedidos já concluídos</span>
                    <div className={styles.card_caixa}>
                        {!pedidoAtivo && (
                            <div className={styles.comissao_card}>
                                <h4>joao.carlos</h4>
                                <p>Pedido cancelado e arquivado.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* MODAL */}
                {showModal && (
                    <div className={styles.modal_overlay}>
                        <div className={styles.modal}>
                            <span onClick={() => setShowModal(false)}>&#10006;</span>
                            <h3>Aceitar Comissão</h3>
                            <form className={styles.form_modal} onSubmit={handleSubmitModal}>
                                <label>Valor:
                                    <input
                                        type="number"
                                        value={valor}
                                        onChange={(e) => setValor(e.target.value)}
                                        required
                                    />
                                </label>
                                {valor && (
                                    <p>Valor formatado: <strong>{formatarValor(valor)}</strong></p>
                                )}
                                <br />
                                <label>Incluir uma mensagem para [nome cliente]:</label>
                                <textarea
                                    placeholder="Mensagem"
                                    value={mensagem}
                                    onChange={(e) => setMensagem(e.target.value)}
                                    required
                                ></textarea>
                                <button type="submit">Enviar</button>
                            </form>
                            <p>Enviaremos um e-mail assim que o pagamento for feito.</p>
                        </div>
                    </div>
                )}

                {/* NOTIFICAÇÃO */}
                {showNotificacao && (
                    <div className={styles.notificacao}>
                        Comissão aceita com sucesso! Aguarde o pagamento do cliente.
                    </div>
                )}
            </div>
        </section>
    );
}

export default PainelArtista;
