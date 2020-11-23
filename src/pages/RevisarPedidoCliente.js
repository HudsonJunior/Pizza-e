import React, { useState } from "react";
import Menubar from "../components/MenubarComponent";
import { Table, Button } from "react-bootstrap";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { FiXCircle } from "react-icons/fi";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import { FiArrowRight } from "react-icons/fi";
import { useHistory } from "react-router-dom";

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

const Revisar = () => {
  const history = useHistory();
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  const [open, setOpen] = useState(false);

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

  const handleNext = () => {
    history.push("/concluir-pedido");
  };
  return (
    <>
      <Menubar currentUser={convertedUser} />
      <h1>Revisar Pedido</h1>
      <p>Agora, verifique se seu pedido está correto.</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>ID</td>
            <td>Nome</td>
            <td>Valor</td>
            <td>Valor Promocional</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Ações</td>
          </tr>
        </thead>
        {data.map((item) => (
          <tbody>
            <tr>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.valor}</td>
              <td>{item.valorpromo}</td>
              <td>{item.descricao}</td>
              <td>
                1
                <Fab
                  color="light"
                  aria-label="add"
                  size="small"
                  style={{ margin: 5 }}
                >
                  <RemoveIcon />
                </Fab>
                <Fab
                  color="light"
                  aria-label="add"
                  size="small"
                  style={{ margin: 5 }}
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
                      onClick={handleClose}
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
      <Button
        className="botao"
        style={{
          marginRight: 7,
          borderWidth: 1,
          borderColor: "black",
        }}
        type="submit"
        variant="success"
        onClick={handleNext}
      >
        <FiArrowRight /> Próximo
      </Button>
      <ToastContainer />
    </>
  );
};

export default Revisar;
