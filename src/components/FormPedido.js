import React from "react";
import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../components/styles/PedidoStyle.css";
import Menubar from "./MenubarComponent";

import { makeStyles } from "@material-ui/core/styles";
import { Dialog } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Button } from "react-bootstrap";

import BarraPesquisa from "./BarraPesquisaComponent";
import Pagamento from "./Pedido/PedidoPagamento";
import Observacoes from "./Pedido/PedidoObservacao";
import Expedicao from "./Pedido/PedidoExpedicao";
import TabelaProdutoPedido from "./Pedido/PedidoTabelaProdutos";
import NotaFiscalCpf from "./Pedido/PedidoCpfNaNota";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
}));

const FormPedido = props => {
  console.log("form pedido", props)
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  const history = useHistory();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const {tipo} = props
  const {item} = props

  const [itemFormaPag, setFormaPag] = React.useState("Dinheiro")
  const [observacoesValue, setObservacoes] = React.useState("")
  const [cpfRadio,setCpfRadio] = React.useState("")
  const [valueRadio, setValueRadio] = React.useState("semCpf")
  const [valueFormaExpedicao, setFormaExpedicao] = React.useState("")
  const isCadastro = tipo === "Cadastrar"

  useEffect(() => {
    if(item){
      setFormaPag(item.pagamento)
      setObservacoes(item.observacoes)
      setCpfRadio(item.CPF)
      setFormaExpedicao(item.expedicao)
    }
  }, [])
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
    if(isCadastro){
      toast.success("🍕 Pedido feito! Nota fiscal emitida!", {
        toastStyle,
      });
    }
    else{
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
        <form className={classes.root} onSubmit={handleSave}>
          <div className="divEsquerda">
            <BarraPesquisa />
            <TabelaProdutoPedido />
          </div>

          <div className="divDireita">
            <Pagamento formaPagamento={itemFormaPag} />
            <Observacoes observacoes={observacoesValue}/>
            <Expedicao formaExpedicao={valueFormaExpedicao}/>
            {isCadastro && (
              <NotaFiscalCpf />
            )}
            

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
                  {isCadastro ? "Deseja continuar o registro do pedido?" : "Deseja continuar com a edição do pedido?"}
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
