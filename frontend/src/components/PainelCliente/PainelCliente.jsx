import styles from "./PainelCliente.module.css";
import { useEffect, useState } from "react";

function PainelCliente() {
  const [comissao, setComissao] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("comissaoId");

    if (!id) {
      setError("Nenhuma comissão encontrada para este usuário.");
      setComissao(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`http://localhost:8080/api/comissoes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar comissão");
        return res.json();
      })
      .then((data) => {
        setComissao(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setComissao(null);
        setLoading(false);
      });
  }, []);

    const cancelarComissao = () => {
     const id = localStorage.getItem("comissaoId");
     if (!id) return;

     const confirmacao = window.confirm(
       "Tem certeza que deseja cancelar esta comissão?"
     );
     if (!confirmacao) return;

     fetch(`http://localhost:8080/api/comissoes/${id}`, {
       method: "DELETE",
     })
       .then((res) => {
         if (!res.ok) throw new Error("Erro ao cancelar a comissão");
         localStorage.removeItem("comissaoId");
         setComissao(null);
         setError(null);
       })
       .catch((err) => {
         setError("Erro ao cancelar: " + err.message);
       });
   };

  return (
    <div className={styles.caixa}>
      <div className={styles.painelCliente_container}>
        {/* PAINEL PEDIDOS */}
        <div className={styles.pedidos_card}>
          <h2>Pedido</h2>
          <h3>Pedido está aguardando resposta do artista</h3>
          <span>Assim que o artista aceitar, o pagamento será liberado</span>

          {loading && (
            <div className={styles.card_caixa}>
              <span>Carregando comissão...</span>
            </div>
          )}

          {error && (
            <div className={styles.card_caixa} style={{ color: "red" }}>
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && comissao && (
            <div className={styles.card_caixa}>
              <div className={styles.comissao_card}>
                <h4>{comissao.nomeUsuario}</h4>

                <h4>
                  Mensagem: <br />
                  <span>{comissao.mensagem}</span>
                </h4>

                {comissao.caminhoImagem && (
                  <>
                    <h4>Imagem de referência:</h4>
                    <img
                      src={`http://localhost:8080/uploads/${comissao.caminhoImagem}`}
                      alt="Imagem da comissão"
                      className={styles.comissao_imagem}
                    />
                  </>
                )}

                <button className={styles.cancelar} onClick={cancelarComissao}>
                  Cancelar Comissão
                </button>
              </div>
            </div>
          )}

          {!loading && !error && !comissao && (
            <div className={styles.card_caixa}>
              <span>Nenhuma comissão encontrada.</span>
            </div>
          )}
        </div>

        {/* PAINEL PAGAMENTO */}
        <div className={styles.pagamentos_card}>
          <h2>Pagamento</h2>
          <h3>Pedido aceito e aguardando a realização do pagamento</h3>
          <span>O trabalho começa após a confirmação do pagamento</span>
          <div className={styles.card_caixa}>
            <span>Em breve: status do pagamento.</span>
          </div>
        </div>

        {/* PAINEL TRABALHO */}
        <div className={styles.trabalhofinal_card}>
          <h2>Trabalho</h2>
          <h3>Visualização ou download do arquivo entregue</h3>
          <span>Verifique se o resultado está como você queria</span>
          <div className={styles.card_caixa}>
            <span>arte finalizada ou rascunho.</span>
          </div>
        </div>

        {/* PAINEL CONCLUIR */}
        <div className={styles.conclussao_card}>
          <h2>Conclusão</h2>
          <h3>
            Confirme a finalização do pedido se estiver satisfeito com o
            resultado
          </h3>
          <span>Se estiver satisfeito, clique em finalizar</span>
          <div className={styles.card_caixa}>
            <span>Status de conclusão aparecerá aqui.</span>
          </div>
        </div>

        {/* PAINEL HISTORICO */}
        <div className={styles.historico_card}>
          <h2>Histórico</h2>
          <h3>Pedidos já concluídos</h3>
          <span>Acesse pedidos anteriores e detalhes da solicitação</span>

          <div className={styles.card_caixa}>
            <span>Histórico das solicitações feitas.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PainelCliente;
