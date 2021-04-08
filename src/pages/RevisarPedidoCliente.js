import React, { useState } from "react";
import Menubar from "../components/MenubarComponent";
import { Table, Button } from "react-bootstrap";
import { FiXCircle } from "react-icons/fi";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import { FiArrowRight } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { green, red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";

import "react-toastify/dist/ReactToastify.css";

const data = [
  {
    id: 1,
    nome: "Frango G",
    valor: 32.9,
    valorPromocional: null,
    descricao: "Pizza de frango com catupiry, tamanho grande.",
  },
  {
    id: 11,
    nome: "Refrigerante Bald-Cola 2L",
    valor: 6.9,
    valorPromocional: 4.85,
  },
];

const Revisar = (props) => {
  const { produtos, valorPedido } = props.location.state;
  const history = useHistory();
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  const [open, setOpen] = useState(false);
  const [produtosPedido, setProdutosPedido] = useState(produtos);
  const [valor, setValor] = useState(valorPedido);

  const toastStyle = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    toast.success("🍕 Produto removido com sucesso!", {
      toastStyle,
    });
  };

  const handleDeleteItem = (id) => {
    for (var i = 0; i < produtosPedido.length; i++) {
      if (produtosPedido[i]._id === id) {
        produtosPedido.splice(i, 1);
        setProdutosPedido(produtosPedido);
      }
    }
    handleClose();
  };

  const getValor = () => {
    let valor = 0;
    for (let produto of produtosPedido) {
      valor += parseFloat(produto.valor) * parseInt(produto.quantidade);
    }
    setValor(valor);
  };

  const handleAdd = (id, nome, valor) => {
    let existeProduto = false;
    for (var i = 0; i < produtosPedido.length; i++) {
      if (id === produtosPedido[i]._id) {
        existeProduto = true;
        produtosPedido[i].quantidade += 1;
        break;
      }
    }
    if (!existeProduto) {
      let obj = new Object();
      obj._id = id;
      obj.nome = nome;
      obj.quantidade = 1;
      obj.valor = valor;
      produtosPedido.push(obj);
    }
    setProdutosPedido(produtosPedido);
    getValor();
  };

  const handleSub = (id) => {
    let existeProduto = false;
    var i = 0;
    for (i = 0; i < produtosPedido.length; i++) {
      if (id === produtosPedido[i]._id) {
        existeProduto = true;
        produtosPedido[i].quantidade -= 1;
        break;
      }
    }
    if (existeProduto && produtosPedido[i].quantidade === 0) {
      produtosPedido.splice(i, 1);
    }
    setProdutosPedido(produtosPedido);
    getValor();
  };

  const handleNext = () => {
    if (produtos.length > 0) {
      history.push("/concluir-pedido", {
        produtosPedido: produtosPedido,
        valor: valor,
      });
    } else {
      toast.error(
        "🍕 Seu pedido está vazio, você será redirecionado ao cardápio!",
        {
          toastStyle,
        }
      );
      setTimeout(() => {
        history.push("/cardapio");
      }, 3000);
    }
  };

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <h1>Revisar Pedido</h1>
      <p>Agora, verifique se seu pedido está correto.</p>
      {produtosPedido.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>Descrição</td>
              <td>Valor</td>
              <td>Quantidade</td>
              <td>Remover</td>
            </tr>
          </thead>
          {produtosPedido.map((item) => (
            <tbody>
              <tr>
                <td>{item.nome}</td>
                <td>{parseInt(item.valor) * parseInt(item.quantidade)}</td>
                <td>
                  <Fab
                    size="small"
                    aria-label="remove"
                    style={{ backgroundColor: red[500] }}
                    onClick={() => handleSub(item._id)}
                  >
                    <RemoveIcon />
                  </Fab>
                  <TextField
                    style={{ width: 17 }}
                    id="quantidade"
                    value={item.quantidade}
                    disabled
                  />
                  <Fab
                    size="small"
                    aria-label="add"
                    style={{ backgroundColor: green[500] }}
                    onClick={() => handleAdd(item._id, item.nome, item.valor)}
                  >
                    <AddIcon />
                  </Fab>
                </td>
                <td>
                  <Button variant="danger" onClick={handleClickOpen}>
                    <FiXCircle size={20} color="#black" />
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle id="alert-dialog-apagar">
                      {"Deseja realmente remover o item?"}
                    </DialogTitle>
                    <DialogActions>
                      <Button
                        variant="danger"
                        className="botao"
                        onClick={() => setOpen(false)}
                        color="primary"
                      >
                        Não
                      </Button>
                      <Button
                        className="botao"
                        variant="success"
                        onClick={() => handleDeleteItem(item._id)}
                        color="primary"
                        autoFocus
                      >
                        Sim
                      </Button>
                    </DialogActions>
                  </Dialog>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        handleNext()
      )}

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
            onChange={(event) => setValor(event.target.value)}
            value={"R$ " + valor}
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
    </>
  );
};

export default Revisar;
