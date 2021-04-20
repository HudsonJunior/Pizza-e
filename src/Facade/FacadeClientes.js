import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const axios = require("axios");

export default class FacadeClientes {
  toastStyle = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  getCliente = async (cpf, setCliente) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/clientes?cpf=${cpf}`
      );
      const produtosResponse = await response.data;
      setCliente(produtosResponse[0]);
    } catch (error) {
      setCliente([]);
    }
  };

  getClientePedido = async (cpf) => {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios.get(
          `http://localhost:8080/clientes?cpf=${cpf}`
        );
        const clientesResponse = await response.data;
        resolve(clientesResponse[0]);
      } catch (error) {
        reject();
      }
    });
  };

  delCliente(cpf) {
    return new Promise(function (resolve, reject) {
      try {
        axios.delete(`http://localhost:8080/clientes?cpf=${cpf}`, {});
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  altCliente(body, history) {
    axios
      .patch("http://localhost:8080/clientes", {
        ...body,
      })
      .then((result) => {
        toast.success("🍕 Dados atualizados!", {
          ...this.toastStyle,
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          ...this.toastStyle,
        });
        toast.error(error.response.data.details, {
          ...this.toastStyle,
        });
      });
  }
}
