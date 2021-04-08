import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../components/styles/PedidoStyle.css";
import Menubar from "./MenubarComponent";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Button } from "react-bootstrap";

import Pagamento from "./Pedido/PedidoPagamento";
import Observacoes from "./Pedido/PedidoObservacao";
import Expedicao from "./Pedido/PedidoExpedicao";
import TabelaProdutoPedido from "./Pedido/PedidoTabelaProdutos";
import NotaFiscalCpf from "./Pedido/PedidoCpfNaNota";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
}));

const FormPedido = (props) => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  const history = useHistory();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const { tipo } = props;
  const { item } = props;

  const [produtos, setProdutos] = React.useState([]);
  const [itemFormaPag, setFormaPag] = React.useState("dinheiro");
  const [observacoesValue, setObservacoes] = React.useState("Nenhuma");
  const [cpfNF, setCpfNF] = React.useState("");
  const [valueFormaExpedicao, setFormaExpedicao] = React.useState("balcao");
  const [endereco, setEndereco] = React.useState("");
  const [cpfCliente, setCpfCliente] = React.useState("");
  const [valorPedido, setValorPedido] = React.useState("00,00");
  const [flagPago, setFlagPago] = React.useState("nao");
  const isCadastro = tipo === "Cadastrar";

  useEffect(() => {
    // para a edicao
    if (item) {
      setFormaPag(item.pagamento);
      setObservacoes(item.observacoes);
      setCpfNF(item.CPF);
      setFormaExpedicao(item.expedicao);
    }
  }, []);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    var today = new Date();

    var date =
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);

    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    if (isCadastro) {
      const response = axios
        .post("http://localhost:8080/pedido", {
          produtos,
          formaPagamento: itemFormaPag,
          formaExpedicao: valueFormaExpedicao,
          endereco: endereco,
          data: date,
          hora: time,
          cpfCliente,
          cpfNF,
          observacoes: observacoesValue,
          statusPedido: "realizado",
          valor: parseFloat(valorPedido),
          statusPagamento: flagPago,
        })
        .then(function (response) {
          console.log(response);
          toast.success("🍕 Pedido feito! Nota fiscal emitida!", {
            toastStyle,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      toast.success("🍕 Pedido alterado!", {
        toastStyle,
      });
    }

    setTimeout(() => {
      history.push("/pedidos");
    }, 2000);
  };

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="RegistroPedido">
        <h2>{isCadastro ? "Registro de Pedido" : "Editar pedido"}</h2>
        <form className={classes.root} onSubmit={handleSubmit}>
          <div className="divEsquerda">
            <TabelaProdutoPedido
              produtosPedido={produtos}
              valor={valorPedido}
              setProdutosPedido={setProdutos}
              setValor={setValorPedido}
            />
          </div>
          <div className="divDireita">
            <TextField
              style={{ width: 100 }}
              id="valorPedido"
              onChange={(event) => setValorPedido(event.target.value)}
              value={"R$ " + valorPedido}
              label="Valor Total"
            />
            <Pagamento setPagamento={setFormaPag} formaPag={itemFormaPag} />
            <Observacoes
              setObs={setObservacoes}
              observacoes={observacoesValue}
            />
            <Expedicao
              type="funcionario"
              setCliente={setCpfCliente}
              setEndereco={setEndereco}
              setExpedicao={setFormaExpedicao}
              cpfCliente={cpfCliente}
              endereco={endereco}
              formaExpedicao={valueFormaExpedicao}
            />
            {isCadastro && <NotaFiscalCpf setCpfNF={setCpfNF} cpfNF={cpfNF} />}
            <FormControl
              required
              component="RadioPagamento"
              className="RPCampos"
            >
              <FormLabel component="legend">Pagamento recebido</FormLabel>
              <RadioGroup
                value={flagPago}
                name="pagamento"
                onChange={(event) => setFlagPago(event.target.value)}
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>

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
                  {isCadastro
                    ? "Deseja continuar o registro do pedido?"
                    : "Deseja continuar com a edição do pedido?"}
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
                {isCadastro ? "Realizar Pedido" : "Editar Pedido"}
              </Button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default FormPedido;
