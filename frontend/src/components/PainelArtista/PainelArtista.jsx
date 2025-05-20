 import styles from './PainelArtista.module.css';
 import UploadIcon from '../../assets/imgs/upload_icon.png';
 import ImgRef from '../../assets/imgs/back_illus.jpg';
 import React, { useState, useRef, useContext, useEffect } from 'react';
 import { AuthContext } from '../../context/AuthContext';

 function PainelArtista() {
     const { usuario } = useContext(AuthContext); // artista logado
     const [showModal, setShowModal] = useState(false);
     const [pedidos, setPedidos] = useState([]);  // lista de pedidos do backend
     const [pedidoAtivoIndex, setPedidoAtivoIndex] = useState(0); // controle do pedido ativo
     const [showNotificacao, setShowNotificacao] = useState(false);
     const [mensagem, setMensagem] = useState('');
     const [valor, setValor] = useState('');
     const fileInputRef = useRef(null);

     // Formata valor para BRL
     const formatarValor = (valor) => {
         const numero = Number(valor);
         if (isNaN(numero)) return '';
         return numero.toLocaleString('pt-BR', {
             style: 'currency',
             currency: 'BRL'
         });
     };

     // Carrega os pedidos do backend quando usuario mudar (login)
     useEffect(() => {
         if (!usuario) return;

         fetch(`http://localhost:8080/api/comissoes/artista/${usuario.id}`)
             .then(res => {
                 if (res.status === 204) return []; // nenhum pedido
                 if (!res.ok) throw new Error('Erro ao carregar pedidos');
                 return res.json();
             })
             .then(data => {
                 setPedidos(data);
                 setPedidoAtivoIndex(0); // volta para o primeiro pedido
             })
             .catch(err => console.error(err));
     }, [usuario]);

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

    const handleCancelar = async () => {
        if (!window.confirm("Tem certeza que deseja cancelar este pedido?")) return;

        const pedido = pedidos[pedidoAtivoIndex];
        if (!pedido) return;

        try {
            const response = await fetch(`http://localhost:8080/api/comissoes/${pedido.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Erro ao cancelar o pedido");
            }

            setPedidos(prev => prev.filter((_, i) => i !== pedidoAtivoIndex));
            setPedidoAtivoIndex(0);
        } catch (error) {
            console.error("Erro ao cancelar o pedido:", error);
        }
    };



    const handleSubmitModal = (e) => {
      e.preventDefault();
      console.log('Submit modal disparado');
      aceitarComissao();
    };

    const aceitarComissao = async () => {
      console.log('Função aceitarComissao iniciada');
      if (!mensagem || !valor) {
        console.log('Mensagem ou valor faltando');
        return;
      }

      try {
        const pedido = pedidos[pedidoAtivoIndex];
        if (!pedido) {
          console.log('Pedido inválido');
          return;
        }

        const response = await fetch("http://localhost:8080/api/aceitarcomissao", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mensagem,
            valor: Number(valor),
            comissao: { id: pedido.id }
          }),
        });

        if (!response.ok) {
          console.log('Resposta não OK:', response.status);
          throw new Error("Erro ao enviar comissão");
        }

        console.log('Comissão aceita com sucesso');
        setShowModal(false);
        setShowNotificacao(true);

        setPedidos(prev => prev.filter((_, i) => i !== pedidoAtivoIndex));
        setPedidoAtivoIndex(0);

        setTimeout(() => setShowNotificacao(false), 4000);
        setMensagem('');
        setValor('');
      } catch (error) {
        console.error("Erro ao aceitar comissão:", error);
      }
    };



     // Pedido ativo atual para renderizar
     const pedidoAtivo = pedidos[pedidoAtivoIndex];

     return (
         <section className={styles.caixa}>
             <div className={styles.painelArtista_container}>
                 {/* PAINEL PEDIDOS */}
                 <div className={styles.pedidos_card}>
                     <h2>Pedidos</h2>
                     <h3>Pedidos que aguardam análise</h3>
                     <span>Veja os detalhes e decida se deseja aceitar</span>

                     <div className={styles.card_caixa}>
                         {pedidoAtivo ? (
                             <div className={styles.comissao_card}>
                                 <h4>{pedidoAtivo.nomeUsuario || pedidoAtivo.clienteNome || 'Cliente'}</h4>
                                 <h4>
                                   Tipo: <span>{pedidoAtivo.portfolio?.tipoArte || "Não especificado"}</span>
                                 </h4>

                                 <h4>Mensagem: <br />
                                     <span>{pedidoAtivo.mensagem || pedidoAtivo.descricaoPedido || ''}</span>
                                 </h4>
                                 <h4>Imagem (s) de referência:</h4>
                                 <img
                                   src={pedidoAtivo.imagens && pedidoAtivo.imagens.length > 0
                                     ? `http://localhost:8080/uploads/${pedidoAtivo.imagens[0]}`
                                     : ImgRef}
                                   alt="img de referencia"
                                 />


                                 <div className={styles.botoes}>
                                     <button className={styles.aceitar} onClick={handleAceitar}>&#10004;</button>
                                     <button className={styles.cancelar} onClick={handleCancelar}>&#10006;</button>
                                 </div>
                             </div>
                         ) : (
                             <p>Sem pedidos no momento.</p>
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
                         {pedidos.length === 0 && (
                             <div className={styles.comissao_card}>
                                 <p>Sem pedidos ativos no momento.</p>
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
                                 <label>Incluir uma mensagem para {pedidoAtivo?.nomeUsuario || 'cliente'}:</label>
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
