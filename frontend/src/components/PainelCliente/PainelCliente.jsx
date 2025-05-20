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

    fetch(`http://localhost:8080/api/comissoes/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cancelar a comissão");
        // Sucesso: remove do estado e do localStorage
        localStorage.removeItem("comissaoId");
        setComissao(null);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className={styles.caixa}>
      <div className={styles.painelCliente_container}>
        <div className={styles.pedidos_card}>
          <h2>Pedido</h2>

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
              <h3>Informações da Comissão</h3>

              <div className={styles.comissao_card}>
                <h4>Usuário:</h4>
                <span>{comissao.nomeUsuario}</span>

                <h4>Mensagem:</h4>
                <span>{comissao.mensagem}</span>

                {comissao.caminhoImagem && (
                  <>
                    <h4>Imagem da comissão:</h4>
                    <img
                      src={`http://localhost:8080/uploads/${comissao.caminhoImagem}`}
                      alt="Imagem da comissão"
                      className={styles.comissao_imagem}
                    />
                  </>
                )}

                <button
                  className={styles.botao_cancelar}
                  onClick={cancelarComissao}
                >
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

        {/* Outros cards */}
        <div className={styles.pagamentos_card}>
          <h2>Pagamento</h2>
          <div className={styles.card_caixa}>
            <span>Em breve: status do pagamento.</span>
          </div>
        </div>

        <div className={styles.trabalhofinal_card}>
          <h2>Trabalho Final</h2>
          <div className={styles.card_caixa}>
            <span>Em breve: arte finalizada ou rascunho.</span>
          </div>
        </div>

        <div className={styles.conclussao_card}>
          <h2>Conclusão</h2>
          <div className={styles.card_caixa}>
            <span>Status de conclusão aparecerá aqui.</span>
          </div>
        </div>

        <div className={styles.historico_card}>
          <h2>Histórico</h2>
          <div className={styles.card_caixa}>
            <span>Histórico de atualizações e mensagens aparecerá aqui.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PainelCliente;
