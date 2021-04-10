const axios = require("axios");

export default class FacadePedido {
  postPedido(
    produtos,
    formaPagamento,
    formaExpedicao,
    endereco,
    data,
    hora,
    cpfCliente,
    cpfNF,
    observacoes,
    valor,
    statusPagamento
  ) {
    return new Promise(function (resolve, reject) {
      try {
        axios.post("http://localhost:8080/pedido", {
          produtos,
          formaPagamento,
          formaExpedicao,
          endereco,
          data,
          hora,
          cpfCliente,
          cpfNF,
          observacoes,
          statusPedido: "realizado",
          valor: parseFloat(valor),
          statusPagamento,
        });
        resolve();
        console.log("aaaaaa");
      } catch (error) {
        reject(error);
      }
    });
  }

  getPedidosData = async (date, setPedidos) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/pedido/data?data=${date}`
      );
      const pedidosResponse = await response.data;
      setPedidos(pedidosResponse);
    } catch (error) {
      setPedidos([]);
    }
  };

  getPedidosCPF = async (cpf, setPedidos) => {
    console.log("cpf", cpf);
    try {
      const response = await axios.get(
        `http://localhost:8080/pedido/cpf?cpfCliente=${cpf}`
      );
      const pedidosResponse = await response.data;
      console.log("pedidosResponse", pedidosResponse);
      setPedidos(pedidosResponse);
    } catch (error) {
      setPedidos([]);
    }
  };
}
