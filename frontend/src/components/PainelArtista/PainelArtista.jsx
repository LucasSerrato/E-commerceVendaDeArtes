import styles from './PainelArtista.module.css';
import UploadIcon from '../../assets/imgs/upload_icon.png';
import ImgRef from '../../assets/imgs/back_illus.jpg';
import React, { useState, useRef } from 'react';


function PainelArtista() {
    // FUNÇÃO PARA UPLOAD DE IMAGEM, MODAL E BOTAO ACEITAR E CANCELAR 
    const [showModal, setShowModal] = useState(false);
    const [pedidoAtivo, setPedidoAtivo] = useState(true);
    const fileInputRef = useRef(null);

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
    }

    const handleCancelar = () => {
        setPedidoAtivo(false);
    }

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
                                <h4>Tipo: <span>Illustração</span> </h4>
                                <h4>Mensagem: <br />
                                    <span>Oi! Eu vi que você trabalha muito com backgrounds e cenas,
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

                    <div className={styles.card_caixa}>
                    </div>
                </div>

                {/* PAINEL TRABALHO FINAL */}
                <div className={styles.trabalhoFim_card}>
                    <h2>Trabalho final</h2>
                    <h3>Pedidos com entregas parciais ou em processo</h3>
                    <span>Você pode atualizar o progresso aqui</span>

                    <div className={styles.card_caixa}>
                        <div onClick={handleClick} className={styles.uploadBox}>
                            <img src={UploadIcon} alt='icon baixar' />
                            <p>Faça upload da imagem aqui</p>
                        </div>
                        <input type="file"
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

                    <div className={styles.card_caixa}>
                    </div>
                </div>

                {/* PAINEL CONCLUÍDOS */}
                <div className={styles.concluidos_card}>
                    <h2>Concluídos</h2>
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
                            <form className={styles.form_modal}>
                                <label>Valor: <input type="number" required /></label>
                                <br />
                                <label>Incluir uma mensagem para [nome cliente]:</label>
                                <textarea placeholder="Mensagem" required></textarea>
                            </form>
                            <p>Enviaremos um e-mail assim que o pagamento for feito.</p>

                            <button onClick={() => setShowModal(false)}>Enviar</button>
                        </div>
                    </div>
                )}
            </div>

        </section>
    )
}

export default PainelArtista;