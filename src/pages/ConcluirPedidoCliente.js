import React, { useEffect } from "react";
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
import TextField from "@material-ui/core/TextField";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import "../components/styles/ConcluirPedidoStyle.css";
import FormDialogAjuda from "../components/Pedido/DialogAjudaCliente";
import FacadePedido from "../Facade/FacadePedido";
const facadePedido = new FacadePedido();

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

  const [itemFormaPag, setFormaPag] = React.useState("dinheiro");
  const [valueFormaExpedicao, setFormaExpedicao] = React.useState("balcao");
  const [observacoesValue, setObservacoes] = React.useState("Nenhuma");
  const [cpfNF, setCpfNF] = React.useState("");
  const [endereco, setEndereco] = React.useState("");
  const [produtosPedido, setProdutosPedido] = React.useState(
    JSON.parse(localStorage.getItem("produtosPedido"))
  );
  const [valorPedido, setValorPedido] = React.useState(
    JSON.parse(localStorage.getItem("valorPedido"))
  );
  const [flagPago] = React.useState("nao");
  const [cpfCliente, setCpfCliente] = React.useState("");

  useEffect(() => {
    if (convertedUser) setCpfCliente(convertedUser.cpf);
  });

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

    var today = new Date();

    var date =
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);

    var time =
      ("0" + today.getHours()).slice(-2) +
      ":" +
      ("0" + today.getMinutes()).slice(-2) +
      ":" +
      ("0" + today.getSeconds()).slice(-2);

    facadePedido
      .postPedido(
        produtosPedido,
        itemFormaPag,
        valueFormaExpedicao,
        endereco,
        date,
        time,
        cpfCliente,
        cpfNF,
        observacoesValue,
        valorPedido,
        flagPago
      )
      .then((result) => {
        toast.success(
          "🍕 Pedido feito e nota fiscal emitida! Acompanhe seu pedido na página Minha conta",
          {
            toastStyle,
          }
        );
        localStorage.removeItem("produtosPedido");
        localStorage.removeItem("valorPedido");
        setTimeout(() => {
          history.push("/minhaConta");
        }, 4000);
      })
      .catch((error) => {
        toast.error("🍕 Ocorreu um erro ao registrar o pedido!", {
          toastStyle,
        });
      });
  };
  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="concluirPage">
        <h1>Concluir Pedido</h1>
        <p>Por fim, preencha os seguintes campos.</p>
        <FormDialogAjuda etapa={3} />
        <form className={classes.root} onSubmit={handleSave}>
          <TextField
            style={{ width: 100 }}
            id="valorPedido"
            onChange={(event) =>
              setValorPedido(event.target.value.replace("R$ ", ""))
            }
            value={"R$ " + valorPedido}
            label="Valor Total"
            disabled
          />
          {convertedUser && convertedUser.type === "C" && (
            <Expedicao
              type="cliente"
              setEndereco={setEndereco}
              setExpedicao={setFormaExpedicao}
              endereco={endereco}
              formaExpedicao={valueFormaExpedicao}
            />
          )}
          {!convertedUser && (
            <Expedicao
              type="visitante"
              setEndereco={setEndereco}
              setExpedicao={setFormaExpedicao}
              endereco={endereco}
              formaExpedicao={valueFormaExpedicao}
            />
          )}
          <Pagamento setPagamento={setFormaPag} formaPag={itemFormaPag} />
          <Observacoes setObs={setObservacoes} observacoes={observacoesValue} />
          <NotaFiscalCpf setCpfNF={setCpfNF} cpfNF={cpfNF} />

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
                {"Deseja revisar o pedido novamente?"}
              </DialogTitle>
              <DialogActions>
                <Button
                  className="botaoNaoPedido"
                  variant="danger"
                  onClick={handleClose}
                  color="primary"
                >
                  Não
                </Button>

                <Button
                  variant="success"
                  onClick={handleClose}
                  href="/revisar-pedido"
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
