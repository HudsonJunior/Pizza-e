import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import TabelaProdutoPedido from "./Pedido/PedidoTabelaProdutos";
import { ToastContainer, toast } from "react-toastify";
import { Table } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";

import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import FormDialogAjuda from "./Pedido/DialogAjudaCliente";

const Cardapio = () => {
  const history = useHistory();
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  const [valorPedido, setValorPedido] = useState("00,00");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("produtosPedido") &&
      localStorage.getItem("valorPedido")
    ) {
      setProdutos(JSON.parse(localStorage.getItem("produtosPedido")));
      setValorPedido(JSON.parse(localStorage.getItem("valorPedido")));
    }
  }, []);

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
      localStorage.setItem("produtosPedido", JSON.stringify(produtos));
      localStorage.setItem("valorPedido", JSON.stringify(valorPedido));
      history.push("/revisar-pedido");
    } else {
      toast.error("🍕 Por favor, selecione um item!", {
        toastStyle,
      });
    }
  };

  return (
    <div>
      {(convertedUser && convertedUser.type === "C") || !convertedUser ? (
        <div>
          <h1>Cardápio</h1>
          <p>Adicione os itens do seu pedido...</p>
          <FormDialogAjuda etapa={1} />
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
                disabled
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
      ) : (
        <div>
          <h3>Esta página é exclusiva para clientes e visitantes!</h3>
          <p>Para registrar um pedido, você deve seguir o fluxo:</p>
          <p>{"Área de Funcionários > Pedidos > + Adicionar"} </p>
        </div>
      )}
    </div>
  );
};

export default Cardapio;
