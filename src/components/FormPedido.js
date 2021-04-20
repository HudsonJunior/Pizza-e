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
import FormDialogAjuda from "./Pedido/DialogAjudaFunc";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { MenuItem } from "@material-ui/core";

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
  const [status, setStatus] = React.useState("nao");
  const isCadastro = tipo === "Cadastrar";
  const isEdit = tipo === "Editar";

  useEffect(() => {
    // para a edicao
    if (item) {
      setFormaPag(item.formaPagamento);
      setObservacoes(item.observacoes);
      setCpfNF(item.CPF);
      setFormaExpedicao(item.formaExpedicao);
      setStatus(item.statusPedido);
      setValorPedido(item.valor);
      if (item.cpfCliente) setCpfCliente(item.cpfCliente);
      if (item.endereco) setEndereco(item.endereco);
      if (item.statusPagamento) setFlagPago(item.statusPagamento);
      if (item.produtos) setProdutos(item.produtos);
      if (item.cpfNF) setCpfNF(item.cpfNF);
    }
    if (
      localStorage.getItem("produtosPedido") &&
      localStorage.getItem("valorPedido")
    ) {
      setProdutos(JSON.parse(localStorage.getItem("produtosPedido")));
      setValorPedido(JSON.parse(localStorage.getItem("valorPedido")));
    }
  }, []);

  useEffect(() => {
    if (produtos && valorPedido) {
      localStorage.setItem("produtosPedido", JSON.stringify(produtos));
      localStorage.setItem("valorPedido", JSON.stringify(valorPedido));
    } else {
      limpaStorage();
    }
  }, [produtos, valorPedido]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    limpaStorage();
    setOpen(false);
  };

  const toastStyle = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    limpaStorage();
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

    if (isCadastro) {
      if (produtos.length > 0) {
        facadePedido
          .postPedido(
            produtos,
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
            toast.success("🍕 Pedido feito! Nota fiscal emitida!", {
              toastStyle,
            });
            setTimeout(() => {
              history.push("/pedidos");
            }, 2000);
          })
          .catch((error) => {
            toast.error("🍕 Ocorreu um erro ao registrar o pedido!", {
              toastStyle,
            });
          });
      } else {
        toast.error("🍕 Selecione um item!", {
          toastStyle,
        });
      }
    } else {
      const body = {
        produtos,
        formaPagamento: itemFormaPag,
        formaExpedicao: valueFormaExpedicao,
        endereco: endereco,
        data: item.data,
        hora: item.time,
        cpfCliente,
        cpfNF,
        observacoes: observacoesValue,
        statusPedido: status,
        valor: parseFloat(valorPedido),
        statusPagamento: flagPago,
        id: item._id,
      };

      facadePedido.patchPedidos(
        body,
        "🍕 Pedido alterado com sucesso!",
        false,
        history,
        toastStyle
      );
    }
  };

  const limpaStorage = () => {
    if (
      localStorage.getItem("produtosPedido") &&
      localStorage.getItem("valorPedido")
    ) {
      localStorage.removeItem("produtosPedido");
      localStorage.removeItem("valorPedido");
    }
  };

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="RegistroPedido">
        <h2>{isCadastro ? "Registro de Pedido" : "Editar pedido"}</h2>
        {isCadastro ? <FormDialogAjuda /> : <div></div>}
        <form className={classes.root} onSubmit={handleSubmit}>
          <div className="divEsquerda">
            <TabelaProdutoPedido
              produtosPedido={produtos}
              valor={valorPedido}
              setProdutosPedido={setProdutos}
              setValor={setValorPedido}
            />
          </div>
          <div className="divDireita" style={{ marginTop: 70 }}>
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
            <Expedicao
              type="funcionario"
              setCliente={setCpfCliente}
              setEndereco={setEndereco}
              setExpedicao={setFormaExpedicao}
              cpfCliente={cpfCliente}
              endereco={endereco}
              formaExpedicao={valueFormaExpedicao}
            />
            <Pagamento setPagamento={setFormaPag} formaPag={itemFormaPag} />
            <Observacoes
              setObs={setObservacoes}
              observacoes={observacoesValue}
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
              {isEdit ? (
                <TextField
                  className={classes.textField}
                  onChange={(event) => setStatus(event.target.value)}
                  value={status}
                  select
                  id="standard-select-currency"
                  label="Status"
                  required
                >
                  <MenuItem value={"realizado"}>Realizado</MenuItem>
                  <MenuItem value={"preparando"}>Em preparo</MenuItem>
                  <MenuItem value={"viagem"}>Na viagem</MenuItem>
                  <MenuItem value={"entregue"}>Entregue</MenuItem>
                  <MenuItem value={"cancelado"}>Cancelado</MenuItem>
                </TextField>
              ) : (
                <></>
              )}
            </FormControl>

            <div className="RPBotoes" style={{ paddingBottom: 10 }}>
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
                    ? "Deseja voltar à consulta de pedidos? O registro deste pedido será cancelado"
                    : "Deseja voltar à consulta de pedidos? A edição do pedido será cancelado"}
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
                    color="primary"
                    autoFocus
                    href="/pedidos"
                  >
                    Sim
                  </Button>
                </DialogActions>
              </Dialog>

              <Button
                className="botaoRealizarPedido"
                variant="success"
                style={{
                  marginRight: 7,
                  borderWidth: 1,
                  borderColor: "black",
                }}
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
