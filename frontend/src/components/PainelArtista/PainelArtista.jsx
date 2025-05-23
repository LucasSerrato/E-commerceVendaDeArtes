 import styles from './PainelArtista.module.css';
 import UploadIcon from '../../assets/imgs/upload_icon.png';
 import ImgRef from '../../assets/imgs/back_illus.jpg';
 import React, { useState, useRef, useContext, useEffect } from 'react';
 import { AuthContext } from '../../context/AuthContext';

 function PainelArtista() {
     const { usuario } = useContext(AuthContext); // artista logado
     const [showModal, setShowModal] = useState(false);
     const [pedidos, setPedidos] = useState([]);  // lista de pedidos do backend
     const pedidosPendentes = pedidos.filter(p => p.status === "PENDENTE");
     const [pedidoAtivoIndex, setPedidoAtivoIndex] = useState(0); // controle do pedido ativo
     const [showNotificacao, setShowNotificacao] = useState(false);
     const [mensagem, setMensagem] = useState('');
     const [valor, setValor] = useState('');
     const fileInputRef = useRef(null);

     const [imagemSelecionada, setImagemSelecionada] = useState(null);
     const [imagemPreview, setImagemPreview] = useState(null);
     const [imagensPainelMap, setImagensPainelMap] = useState({});



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
       if (!file) return;

       setImagemSelecionada(file);
       setImagemPreview(URL.createObjectURL(file)); // Para preview
     };

const handleEnviarImagem = async () => {
  if (!imagemSelecionada) {
    alert('Por favor, selecione uma imagem antes de enviar.');
    return;
  }

  const pedido = pedidos.find(p => p.status === "EM_ANDAMENTO");
  if (!pedido) {
    alert("Nenhum pedido em andamento encontrado.");
    return;
  }

  const formData = new FormData();
  formData.append('imagem', imagemSelecionada);

  try {
    const res = await fetch(`http://localhost:8080/api/imagenspainel/${pedido.id}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error('Falha no upload');

    // Atualiza pedidos após envio
    const resAtualizado = await fetch(`http://localhost:8080/api/comissoes/artista/${usuario.id}`);
    if (resAtualizado.ok) {
      const dataAtualizada = await resAtualizado.json();
      setPedidos(dataAtualizada);
    }

    alert('Imagem enviada com sucesso!');
    setImagemSelecionada(null);
    setImagemPreview(null);
  } catch (error) {
    alert('Erro ao enviar imagem');
    console.error(error);
  }
};
useEffect(() => {
  const carregarImagens = async () => {
    const map = {};

    const pedidosEmAndamento = pedidos.filter(p => p.status === "EM_ANDAMENTO");

    await Promise.all(pedidosEmAndamento.map(async (p) => {
      try {
        const res = await fetch(`http://localhost:8080/api/imagenspainel/por-comissao/${p.id}`);
        if (res.ok) {
          const imagens = await res.json();
          map[p.id] = imagens;
        }
      } catch (e) {
        console.error(`Erro ao buscar imagens da comissão ${p.id}:`, e);
      }
    }));

    setImagensPainelMap(map);
  };

  if (pedidos.length > 0) {
    carregarImagens();
  }
}, [pedidos]);





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

            const atualizaComissoes = async () => {
              try {
                const res = await fetch(`http://localhost:8080/api/comissoes/artista/${usuario.id}`);
                if (!res.ok) throw new Error('Erro ao atualizar lista');
                const data = await res.json();
                setPedidos(data);
              } catch (error) {
                console.error('Erro ao atualizar comissões:', error);
              }
            };

            setPedidoAtivoIndex(0);
            await atualizaComissoes();
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
     if (!mensagem || !valor || Number(valor) <= 0) {
       console.log('Mensagem ou valor inválido');
       return;
     }

     const pedido = pedidos[pedidoAtivoIndex];
     if (!pedido) return;

     const corpo = {
       id: null,
       comissao: pedido,
       valor: Number(valor),
       mensagem,
       dataAceite: new Date().toISOString()
     };


     try {
       const response = await fetch("http://localhost:8080/api/aceitarcomissao", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(corpo),
       });

       if (!response.ok) {
         throw new Error("Erro ao aceitar comissão");
       }

       const resAtualizado = await fetch(`http://localhost:8080/api/comissoes/artista/${usuario.id}`);
       if (resAtualizado.ok) {
           const dataAtualizada = await resAtualizado.json();
           setPedidos(dataAtualizada); // ✅ atualiza com tudo do backend
           setPedidoAtivoIndex(0);
       }


       setShowModal(false);
       setShowNotificacao(true);
       setMensagem('');
       setValor('');
       setTimeout(() => setShowNotificacao(false), 4000);

     } catch (error) {
       console.error("Erro ao aceitar comissão:", error);
     }
   };


     // Pedido ativo atual para renderizar
const pedidosAtivos = pedidos.filter(p => p.status === "PENDENTE");

useEffect(() => {
  const pendentes = pedidos.filter(p => p.status === "PENDENTE");
  setPedidoAtivoIndex(pendentes.length > 0 ? 0 : -1);
}, [pedidos]);


     const pedidoAtivo = pedidoAtivoIndex >= 0 ? pedidosAtivos[pedidoAtivoIndex] : null;
const handleRemoverImagem = () => {
  setImagemSelecionada(null);
  setImagemPreview(null);
};


     return (
         <section className={styles.caixa}>
             <div className={styles.painelArtista_container}>
                 {/* PAINEL PEDIDOS */}
                 <div className={styles.pedidos_card}>
                     <h2>Pedidos</h2>
                     <h3>Pedidos que aguardam análise</h3>
                     <span>Veja os detalhes e decida se deseja aceitar</span>

                     {/* Notificação de quantidade */}
                         {pedidosPendentes.length > 1 && (
                           <div className={styles.alertaQuantidade}>
                             Você tem <strong>{pedidosPendentes.length}</strong> solicitações de comissão pendentes.
                           </div>
                         )}


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
                   <div className={styles.card_caixa}>
                     {pedidos
                        .filter(p => p.status === "AGUARDANDO_PAGAMENTO")
                        .map(p => (
                         <div key={p.id} className={styles.comissao_card}>
                             <p>Aguardando pagamento...</p>
                           <h4>{p.nomeUsuario || "Cliente"}</h4>
                           <h4>Tipo: <span>{p.portfolio?.tipoArte || "Não especificado"}</span></h4>
                          <h4>Mensagem: <br />
                            <span>{p.mensagem || p.descricaoPedido}</span>
                          </h4>
                          <h4>Imagem(s) de referência:</h4>
                          <img
                            src={p.imagens && p.imagens.length > 0
                              ? `http://localhost:8080/uploads/${p.imagens[0]}`
                              : ImgRef}
                            alt="img de referencia"
                          />


                         </div>
                       ))
                     }

                     {pedidos.filter(p => p.status === "AGUARDANDO_PAGAMENTO").length === 0 && (
                       <p>Nenhum pagamento pendente.</p>
                     )}
                   </div>
                 </div>

                 {/* PAINEL EM PROCESSO */}
                 <div className={styles.trabalhoFim_card}>
                   <h2>Em processo</h2>
                   <h3>Pedidos com entregas parciais ou em processo</h3>
                   <span>Você pode atualizar o progresso aqui</span>

                   <div className={styles.card_caixa}>
                     {pedidos.filter(p => p.status === "EM_ANDAMENTO").map(p => (
                       <div key={p.id} className={styles.comissao_card}>
                         <h4>{p.nomeUsuario || "Cliente"}</h4>
                         <h4>Tipo: <span>{p.portfolio?.tipoArte || "Não especificado"}</span></h4>
                         <p>Você pode enviar uma entrega parcial.</p>

                         {imagemPreview && (
                           <div className={styles.previewBox}>
                             <h5>Preview da imagem selecionada:</h5>
                             <img src={imagemPreview} alt="Preview" className={styles.previewImg} />
                             <button
                               className={styles.remover_botao}
                               onClick={handleRemoverImagem}
                             >
                               Remover Imagem
                             </button>
                             <button
                                                        className={styles.enviar_botao}
                                                        onClick={() => handleEnviarImagem(p.id)}
                                                      >
                                                        Enviar
                                                      </button>
                           </div>
                         )}

                         <div onClick={handleClick} className={styles.uploadBox}>
                           <img src={UploadIcon} alt="icon upload" />
                           <p>Faça upload da imagem aqui</p>
                         </div>

                         <input
                           type="file"
                           accept="image/*"
                           ref={fileInputRef}
                           style={{ display: 'none' }}
                           onChange={handleFileChange}
                         />



                         {/* Mostra imagens SOMENTE após o envio */}
                                                  {imagensPainelMap[p.id] && (imagensPainelMap[p.id] || []).length > 0 && (
                                                    <div className={styles.imagensPainel}>
                                                      <h5>Entregas parciais enviadas:</h5>
                                                      <div className={styles.galeria}>
                                                        {imagensPainelMap[p.id]?.map((img) => (
                                                          <img
                                                            key={img.id}
                                                            src={`http://localhost:8080/api/imagenspainel/arquivo/${img.imagem}`}
                                                            alt={img.nomeArquivo}
                                                            className={styles.imagemPainel}
                                                          />
                                                        ))}
                                                      </div>
                                                    </div>
                                                  )}
                       </div>
                     ))}

                     {pedidos.filter(p => p.status === "EM_ANDAMENTO").length === 0 && (
                       <p>Sem pedidos em processo no momento.</p>
                     )}
                   </div>
                 </div>


                 {/* PAINEL CONCLUSÃO */}
                 <div className={styles.conclusao_card}>
                   <h2>Aprovação</h2>
                   <h3>Entregas finais aguardando a aprovação do cliente</h3>
                   <span>Envie o trabalho final e aguarde feedback</span>
                   <div className={styles.card_caixa}>
                     {pedidos
                       .filter(p => p.status === "CONCLUIDA")
                       .map(p => (
                         <div key={p.id} className={styles.comissao_card}>
                           <h4>{p.nomeUsuario || "Cliente"}</h4>
                           <h4>Tipo: <span>{p.portfolio?.tipoArte || "Não especificado"}</span></h4>
                           <p>Entrega enviada. Aguardando aprovação do cliente.</p>
                         </div>
                       ))
                     }
                     {pedidos.filter(p => p.status === "CONCLUIDA").length === 0 && (
                       <p>Sem entregas pendentes de aprovação.</p>
                     )}
                   </div>
                 </div>

                 {/* PAINEL HISTÓRICO */}
                 <div className={styles.concluidos_card}>
                   <h2>Histórico</h2>
                   <h3>Trabalhos já finalizados</h3>
                   <span>Aqui ficam os pedidos já concluídos</span>
                   <div className={styles.card_caixa}>
                     {pedidos.filter(p => p.status === "CANCELADA" || p.status === "CANCELADA_POR_CLIENTE").length === 0 ? (
                       <div className={styles.comissao_card}>
                         <p>Sem cancelamentos ainda.</p>
                       </div>
                     ) : (
                       pedidos
                         .filter(p => p.status === "CANCELADA" || p.status === "CANCELADA_POR_CLIENTE")
                         .map(p => (
                           <div key={p.id} className={styles.comissao_card}>
                             <h4>{p.nomeUsuario || 'Cliente'}</h4>
                             <h4>Tipo: <span>{p.portfolio?.tipoArte}</span></h4>
                             <p>
                               {p.status === "CANCELADA_POR_CLIENTE"
                                 ? `${p.nomeUsuario} cancelou esta solicitação.`
                                 : `Você cancelou esta solicitação.`}
                             </p>
                           </div>
                         ))
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
