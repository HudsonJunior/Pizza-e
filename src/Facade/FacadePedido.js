import { toast } from "react-toastify";
const axios = require("axios");

export default class FacadePedido {
  toastStyle = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

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

  getVendaData = async (dataI, dataF, setRelatorio) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/pedido/datas?dataI=${dataI}&dataF=${dataF}`
      );
      const vendaDatas = await response.data;
      setRelatorio(vendaDatas);
    } catch (error) {
      setRelatorio([]);
    }
  };

  getVendaProduto = async (nome, setRelatorio) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/pedido/produto?nomeProduto=${nome}`
      );
      const vendaProduto = await response.data;
      setRelatorio(vendaProduto);
    } catch (error) {
      setRelatorio([]);
    }
  };

  patchPedidos = async (body, messageSuccess, cancelar = false, history) => {
    axios
      .patch("http://localhost:8080/pedido", {
        ...body,
      })
      .then(function (response) {
        toast.success(messageSuccess, {
          ...this.toastStyle,
        });
        if (cancelar) {
          history.go(0)
        }
        else {
          setTimeout(() => {
            history.push("/pedidos");
          }, 2000);
        }
      })
      .catch(function (error) {
        toast.error(error.response?.data.message, {
          ...this.toastStyle,
        });
        toast.error(error.response?.data.details, {
          ...this.toastStyle,
        });
      });
  }
}
