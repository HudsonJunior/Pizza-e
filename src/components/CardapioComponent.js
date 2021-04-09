import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import TabelaProdutoPedido from "./Pedido/PedidoTabelaProdutos";
import { ToastContainer, toast } from "react-toastify";
import { Table } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";

import "react-toastify/dist/ReactToastify.css";

const axios = require("axios");

const Cardapio = () => {
  const history = useHistory();
  const [valorPedido, setValorPedido] = useState("00,00");
  const [produtos, setProdutos] = useState([]);

  const toastStyle = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleNext = () => {
    if (produtos.length > 0) {
      history.push("/revisar-pedido", {
        produtos: produtos,
        valorPedido: valorPedido,
      });
    } else {
      toast.error("🍕 Por favor, selecione um item!", {
        toastStyle,
      });
    }
  };

  return (
    <div>
      <h1>Cardápio</h1>
      <p style={{ paddingLeft: 15 }}>Adicione os itens do seu pedido...</p>
      <div style={{ width: "50%", display: "inline-block", float: "left" }}>
        <TabelaProdutoPedido
          produtosPedido={produtos}
          valor={valorPedido}
          setProdutosPedido={setProdutos}
          setValor={setValorPedido}
        />
      </div>

      <div
        style={{
          width: "50%",
          float: "left",
          paddingLeft: 25,
          paddingRight: 25,
          paddingTop: 32,
        }}
      >
        <h4>Meu Pedido</h4>
        {produtos.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
              </tr>
            </thead>
            {produtos.map((item) => (
              <tbody>
                <tr>
                  <td>{item.nome}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.valor * item.quantidade}</td>
                </tr>
              </tbody>
            ))}
          </Table>
        ) : (
          <p>Nenhum produto foi adicionado...</p>
        )}
      </div>

      <div
        style={{
          marginTop: 15,
          float: "right",
          paddingRight: 25,
          whiteSpace: "nowrap",
          position: "relative",
          display: "flex",
          bottom: 0,
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginRight: 20 }}>
          <TextField
            style={{ width: 100 }}
            id="valorPedido"
            onChange={(event) => setValorPedido(event.target.value)}
            value={"R$ " + valorPedido}
            label="Valor Total"
          />
        </div>

        <Button
          className="botao"
          style={{
            marginBottom: 0,
            borderWidth: 1,
            borderColor: "black",
            padding: 12,
          }}
          type="submit"
          variant="success"
          onClick={() => handleNext()}
        >
          Próximo
          <FiArrowRight style={{ marginLeft: 3 }} />
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cardapio;
