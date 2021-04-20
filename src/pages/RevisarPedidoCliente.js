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
import FormDialogAjuda from "../components/Pedido/DialogAjudaCliente";
import "react-toastify/dist/ReactToastify.css";

const Revisar = () => {
  const history = useHistory();
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  const [open, setOpen] = React.useState(false);
  const [produtosPedido, setProdutosPedido] = useState(
    JSON.parse(localStorage.getItem("produtosPedido"))
  );
  const [valor, setValor] = React.useState(
    JSON.parse(localStorage.getItem("valorPedido"))
  );

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
  };

  const handleDeleteItem = (id) => {
    for (var i = 0; i < produtosPedido.length; i++) {
      if (produtosPedido[i]._id === id) {
        produtosPedido.splice(i, 1);
        setProdutosPedido(produtosPedido);
        localStorage.setItem("produtosPedido", JSON.stringify(produtosPedido));
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
    localStorage.setItem("valorPedido", JSON.stringify(valor));
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
    localStorage.setItem("produtosPedido", JSON.stringify(produtosPedido));
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
      handleClose();
    }
    setProdutosPedido(produtosPedido);
    localStorage.setItem("produtosPedido", JSON.stringify(produtosPedido));
    getValor();
  };

  const handleNext = () => {
    if (produtosPedido.length > 0) {
      if (!localStorage.getItem("user")) {
        toast.success("🍕 Redirecionando para o login!", {
          toastStyle,
        });
        setTimeout(() => {
          history.push("/login", { tipo: "pedido" });
        }, 3000);
      } else {
        history.push("/concluir-pedido");
      }
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
      <FormDialogAjuda etapa={2} />
      {produtosPedido.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Quantidade</th>
              <th>Remover</th>
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
          width: "100%",
        }}
      >
        <Button
          variant="ligth"
          style={{
            marginLeft: 20,
            borderWidth: 1,
            borderColor: "black",
            backgroundColor: "white",
          }}
          href="/cardapio"
        >
          Voltar
        </Button>

        <div style={{ marginRight: 20 }}>
          <TextField
            id="valorPedido"
            onChange={(event) => setValor(event.target.value)}
            value={"R$ " + valor}
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
            padding: 10,
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
