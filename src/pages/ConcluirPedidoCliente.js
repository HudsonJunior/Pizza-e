import React from "react";
import Menubar from "../components/MenubarComponent";
import Pagamento from "../components/Pedido/PedidoPagamento";
import Observacoes from "../components/Pedido/PedidoObservacao";
import Expedicao from "../components/Pedido/PedidoExpedicao";
import NotaFiscalCpf from "../components/Pedido/PedidoCpfNaNota";
import { Button } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import "../components/styles/ConcluirPedidoStyle.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
}));

const Concluir = () => {
  const user = localStorage.getItem("user");
  const history = useHistory();
  const convertedUser = JSON.parse(user);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
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
  const handleSave = (event) => {
    event.preventDefault();
    toast.success("🍕 Pedido feito! Nota fiscal emitida!", {
      toastStyle,
    });
    setTimeout(() => {
      history.push("/");
    }, 2000);
  };
  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="concluirPage">
        <h1>Concluir Pedido</h1>
        <p>Por fim, preencha os seguintes campos.</p>
        <form className={classes.root} onSubmit={handleSave}>
          <Pagamento />
          <Observacoes />
          {convertedUser && convertedUser.type === "C" && (
            <Expedicao type="cliente" />
          )}
          {!convertedUser && <Expedicao type="visitante" />}
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
                  href="/cardapio"
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
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Concluir;
