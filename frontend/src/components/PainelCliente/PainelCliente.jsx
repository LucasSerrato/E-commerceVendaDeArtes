import styles from './PainelCliente.module.css';
import UploadIcon from '../../assets/imgs/upload_icon.png';
import Pix from '../../assets/imgs/icon_pix.png';
import MasterCard from '../../assets/imgs/mastercard.webp';
import ImgRef from '../../assets/imgs/back_illus.jpg';
import React, { useState } from 'react';

function PainelCliente() {
    // FUNÇÃO PARA MODAL E BOTAO ACEITAR E CANCELAR
    const [showModal, setShowModal] = useState(false);
    const [pedidoAtivo, setPedidoAtivo] = useState(true);

    const handleAceitar = () => {
        setShowModal(true);
    }

    const handleCancelar = () => {
        setPedidoAtivo(false);
    }

    return (
        <section className={styles.caixa}>

            <div className={styles.painelCliente_container}>

                {/* PAINEL PEDIDOS */}
                <div className={styles.pedidos_card}>
                    <h2>Pedidos</h2>
                    <h3>Pedido está aguardando resposta do artista</h3>
                    <span>Assim que o artista aceitar, o pagamento será liberado</span>

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

                                <button className={styles.cancelar} onClick={handleCancelar}>Cancelar solicitação</button>
                            </div>
                        )}

                    </div>
                </div>

                {/* PAINEL PAGAMENTOS */}
                <div className={styles.pagamentos_card}>
                    <h2>Pagamentos</h2>
                    <h3>Pedido aceito e aguardando a realização do pagamento</h3>
                    <span>O trabalho começa após a confirmação do pagamento</span>

                    <div className={styles.card_caixa}>

                        {pedidoAtivo && (
                            <div className={styles.comissao_card}>
                                <h4>Tipo: <span>Illustração</span> </h4>
                                <h4>Imagem (s) de referência:</h4>
                                <img src={ImgRef} alt="img de referencia" />

                                <button className={styles.aceitar} onClick={handleAceitar}>Realizar pagamento</button>
                                <button className={styles.cancelar} onClick={handleCancelar}>Cancelar solicitação</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* PAINEL TRABALHO */}
                <div className={styles.trabalhofinal_card}>
                    <h2>Trabalho</h2>
                    <h3>Visualização ou download do arquivo entregue</h3>
                    <span>Verifique se o resultado está como você queria</span>

                    <div className={styles.card_caixa}>
                        <button
                            onClick={() => {
                                const link = document.createElement('a');
                                link.href = '/trabalho-final.pdf';
                                link.download = 'trabalho-final.pdf';
                                link.click();
                            }}
                            className={styles.botao_baixar}
                        >
                            <img src={UploadIcon} alt='icon baixar' />
                            baixar
                        </button>
                    </div>
                </div>

                {/* PAINEL CONCLUÍR */}
                <div className={styles.conclussao_card}>
                    <h2>Concluír</h2>
                    <h3>Confirme a finalização do pedido se estiver satisfeito com o resultado</h3>
                    <span>Se estiver satisfeito, clique em finalizar</span>

                    <div className={styles.card_caixa}>
                    </div>
                </div>

                {/* PAINEL HISTÓRICO */}
                <div className={styles.historico_card}>
                    <h2>Histórico</h2>
                    <h3>Pedidos já concluídos</h3>
                    <span>Acesse arquivos anteriores e detalhes do pedido</span>

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
                            <h3>Pagamento da sua commissão</h3>

                            <div className={styles.mensagem_valor}>
                                <div className={styles.mensagem}>
                                    <p>Mensagem da [artista]</p>
                                    <span>Achei sua comissão muito legal! Estou feliz em trabalhar com você!</span>
                                </div>

                                <div className={styles.valor}>
                                    <p>Total</p>
                                    <span>R$200</span>
                                </div>
                            </div>

                            <h4>Selecione sua forma de pagamento</h4>
                            <div className={styles.pagamentos_botao}>
                                <button className={styles.pix} onClick={() => setShowModal(false)}>
                                    <img src={Pix} alt="icon pix" />
                                    Pix
                                </button>
                                <button className={styles.debito} onClick={() => setShowModal(false)}>
                                    <img src={MasterCard} alt="icon pix" />
                                    Cartão de Débito
                                </button>
                                <button className={styles.credito} onClick={() => setShowModal(false)}>
                                    <img src={MasterCard} alt="icon pix" />
                                    Cartão de Crédito
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </section>
    )
}

export default PainelCliente;

