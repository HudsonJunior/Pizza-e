import React from "react";
import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../components/styles/PedidoStyle.css";
import Menubar from "../components/MenubarComponent";

import { makeStyles } from "@material-ui/core/styles";
import { Dialog } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Button } from "react-bootstrap";

import BarraPesquisa from "../components/BarraPesquisaComponent";
import Pagamento from "../components/Pedido/PedidoPagamento";
import Observacoes from "../components/Pedido/PedidoObservacao";
import Expedicao from "../components/Pedido/PedidoExpedicao";
import TabelaProdutoPedido from "../components/Pedido/PedidoTabelaProdutos";
import NotaFiscalCpf from "../components/Pedido/PedidoCpfNaNota";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
}));

const RegistrarPedido = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  const history = useHistory();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toastStyle = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleSave = (event) => {
    event.preventDefault();
    toast.success("🍕 Pedido feito! Nota fiscal emitida!", {
      toastStyle,
    });
    setTimeout(() => {
      history.push("/pedidos");
    }, 2000);
  };

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="RegistroPedido">
        <h2>Registro de Pedido </h2>
        <form className={classes.root} onSubmit={handleSave}>
          <div className="divEsquerda">
            <BarraPesquisa />
            <TabelaProdutoPedido />
          </div>

          <div className="divDireita">
            <Pagamento />
            <Observacoes />
            <Expedicao />
            <NotaFiscalCpf />

            <div className="RPBotoes">
              <Button
                variant="ligth"
                style={{ marginRight: 7, borderWidth: 1, borderColor: "black" }}
                onClick={handleClickOpen}
              >
                Voltar
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="alert-dialog-VoltarPedido">
                  {"Deseja continuar o registro do pedido?"}
                </DialogTitle>
                <DialogActions>
                  <Button
                    className="botaoNaoPedido"
                    variant="danger"
                    href="/pedidos"
                    onClick={handleClose}
                    color="primary"
                  >
                    Não
                  </Button>

                  <Button
                    variant="success"
                    onClick={handleClose}
                    color="primary"
                    autoFocus
                  >
                    Sim
                  </Button>
                </DialogActions>
              </Dialog>

              <Button
                className="botaoRealizarPedido"
                variant="success"
                style={{ marginRight: 7, borderWidth: 1, borderColor: "black" }}
                type="submit"
              >
                Realizar Pedido
              </Button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default RegistrarPedido;
