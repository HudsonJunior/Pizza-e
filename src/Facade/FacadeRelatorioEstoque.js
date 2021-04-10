const axios = require("axios");

export default class FacadeRelatorioEstoque {
  getMovimentacoes = async (data, setRelatorio) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/movimentacoes-estoque?data=${data}`
      );
      const movimentacoes = await response.data;
      setRelatorio(movimentacoes);
    } catch (error) {
      setRelatorio([]);
    }
  };

  getEstoqueVencido = async (data, setRelatorio) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/produtos-estoque/relatorio?data=${data}`
      );
      const vencidos = await response.data;
      setRelatorio(vencidos);
    } catch (error) {
      setRelatorio([]);
    }
  };

  getQuantidadeProduto = async (setRelatorio) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/produtos-estoque/relatorio?flagQtde=true`
      );
      const quantidade = await response.data;
      setRelatorio(quantidade);
    } catch (error) {
      setRelatorio([]);
    }
  };
}
